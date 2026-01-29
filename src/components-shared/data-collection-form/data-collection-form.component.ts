import { Component } from '@angular/core';
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
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormFieldComponent } from '../form-field/form-field.component';

// Custom validator (sync)
function noSchoolEmail(control: AbstractControl): ValidationErrors | null {
  const v = String(control.value ?? '');
  return /\.edu\s*$/i.test(v) ? { eduNotAllowed: true } : null;
}

// Async validator (fake “taken email” check)
function emailAvailable() {
  return (control: AbstractControl) =>
    timer(300).pipe(
      map(() => String(control.value ?? '').trim().toLowerCase()),
      map((val) => (val === 'taken@example.com' ? { emailTaken: true } : null))
    );
}

@Component({
  selector: 'app-data-collection-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './data-collection-form.component.html',
})
export class DataCollectionFormComponent {
  // FormGroup with 3+ controls + validators
  form = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, noSchoolEmail],
      asyncValidators: [emailAvailable()],
      updateOn: 'blur',
    }),

    // Dynamic section
    aliases: new FormArray<FormControl<string>>([]),
  });

  get aliases() {
    return this.form.controls.aliases;
  }

  addAlias() {
    this.aliases.push(
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      })
    );
  }

  removeAlias(i: number) {
    this.aliases.removeAt(i);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Final form value:', this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
      console.warn('Form invalid:', this.form.value);
    }
  }
}