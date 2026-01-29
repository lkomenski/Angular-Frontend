import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FormFieldComponent } from '../form-field/form-field.component';
import { CourseDataService } from '../../services/course-data.service';
import { Router } from '@angular/router';

/**
 * Custom validator: ensures URL format for resources
 */
function validUrl(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  return urlPattern.test(control.value) ? null : { invalidUrl: true };
}

/**
 * Course form with Reactive Forms, custom validators, and FormArray for resources
 */
@Component({
  selector: 'app-data-collection-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './data-collection-form.component.html',
  styleUrls: ['./data-collection-form.component.css'],
})
export class DataCollectionFormComponent {
  private courseData = inject(CourseDataService);
  private router = inject(Router);

  /** FormGroup for course information */
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Z]{2,4}\s?\d{3,4}$/i)],
    }),
    instructor: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
      asyncValidators: [this.instructorExists.bind(this)],
      updateOn: 'blur',
    }),
    /** Dynamic FormArray for course resources */
    resources: new FormArray<FormControl<string>>([]),
  });

  /** Getter for easier FormArray access */
  get resources() {
    return this.form.controls.resources;
  }

  /** Add new resource field to FormArray */
  addResource() {
    this.resources.push(
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, validUrl],
      })
    );
  }

  /** Remove resource field at specified index */
  removeResource(i: number) {
    this.resources.removeAt(i);
  }

  /** Handle form submission with validation */
  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      
      // Get active semester from service
      const activeSemester = this.courseData.activeSemester();
      
      // Create new course with form data
      this.courseData.addCourse({
        name: formValue.name,
        code: formValue.code,
        instructor: formValue.instructor,
        semester: activeSemester?.name || 'Fall 2024',
        credits: 3, // Default value
        targetGrade: 90, // Default A- target
        currentGrade: null,
        color: this.getRandomColor(),
        assignments: [],
        resources: formValue.resources.map((url, idx) => ({
          id: Date.now() + idx,
          name: `Resource ${idx + 1}`,
          url,
          type: 'other' as const
        }))
      });

      // Reset form and navigate
      this.form.reset();
      this.resources.clear();
      alert('Course added successfully!');
    } else {
      this.form.markAllAsTouched();
      console.warn('Form invalid:', this.form.value);
    }
  }

  /**
   * Async validator: simulates checking if instructor exists in system
   * In a real application, this would make an API call to verify instructor
   */
  private instructorExists(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) return of(null);
    
    // Simulate API call with delay
    return of(control.value).pipe(
      delay(800),
      map((name: string) => {
        // Simulate checking against a database of known instructors
        const knownInstructors = [
          'Dr. Smith', 'Prof. Johnson', 'Dr. Williams', 'Prof. Brown',
          'Dr. Jones', 'Prof. Garcia', 'Dr. Martinez', 'Prof. Davis'
        ];
        
        // Check if instructor name matches any known instructor
        const exists = knownInstructors.some(instructor => 
          instructor.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(instructor.toLowerCase())
        );
        
        // Return error if instructor not found in system
        return exists ? null : { instructorNotFound: true };
      })
    );
  }

  /** Helper to generate random course color */
  private getRandomColor(): string {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}