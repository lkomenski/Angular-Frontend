import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.css'],
})
export class FormFieldComponent {
  // Display inputs
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';

  // Reactive Forms support
  @Input({ required: true }) control!: FormControl<string>;

  // Optional legacy support for two-way binding
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  // Accessibility IDs
  inputId = `ff-${Math.random().toString(36).slice(2)}`;
  errorId = `${this.inputId}-error`;

  onInput(evt: Event) {
    this.valueChange.emit((evt.target as HTMLInputElement).value);
  }

  showError(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  errorMessage(): string {
    const e = this.control.errors;
    if (!e) return '';

    if (e['required']) return 'This field is required.';
    if (e['minlength']) return `Must be at least ${e['minlength'].requiredLength} characters.`;
    if (e['email']) return 'Enter a valid email address.';
    if (e['eduNotAllowed']) return '.edu emails are not allowed.';
    if (e['emailTaken']) return 'That email is already taken.';
    return 'Invalid value.';
  }
}