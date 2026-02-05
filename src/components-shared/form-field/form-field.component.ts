import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * Reusable form field component with Reactive Forms integration
 */
@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.html'
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';

  /** FormControl for Reactive Forms integration */
  @Input({ required: true }) control!: FormControl<string>;

  // Legacy two-way binding support
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  // Accessibility IDs
  inputId = `ff-${Math.random().toString(36).slice(2)}`;
  errorId = `${this.inputId}-error`;

  onInput(evt: Event) {
    this.valueChange.emit((evt.target as HTMLInputElement).value);
  }

  /** Shows errors only after user interaction */
  showError(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  /** Returns appropriate error message based on validation errors */
  errorMessage(): string {
    const e = this.control.errors;
    if (!e) return '';

    if (e['required']) return 'This field is required.';
    if (e['minlength']) return `Must be at least ${e['minlength'].requiredLength} characters.`;
    if (e['maxlength']) return `Cannot exceed ${e['maxlength'].requiredLength} characters.`;
    if (e['pattern']) return 'Invalid format (e.g., CS 101, MATH 2210).';
    if (e['invalidUrl']) return 'Enter a valid URL (e.g., https://example.com).';
    if (e['invalidName']) return 'Enter a valid name (letters, spaces, hyphens only).';
    if (e['invalidInstructorName']) return 'Enter full name with title (e.g., Dr. John Smith, Prof. Jane Doe).';
    if (e['instructorNotFound']) return 'Instructor not found in system.';
    if (e['email']) return 'Enter a valid email address.';
    if (e['eduNotAllowed']) return '.edu emails are not allowed.';
    if (e['emailTaken']) return 'That email is already taken.';
    return 'Invalid value.';
  }
}