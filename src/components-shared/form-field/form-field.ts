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
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';

  // Reactive Forms support
  @Input() control?: FormControl<string>;

  // Legacy support (signals/valueChange)
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  // Accessibility IDs for label + error association
  inputId = `ff-${Math.random().toString(36).slice(2)}`;
  errorId = `${this.inputId}-error`;


  onInput(evt: Event) {
    this.valueChange.emit((evt.target as HTMLInputElement).value);
  }

  showError(): boolean {
    return !!this.control && this.control.invalid && (this.control.touched || this.control.dirty);
  }

  errorMessage(): string {
    const c = this.control;
    if (!c?.errors) return '';

    if (c.errors['required']) return 'This field is required.';
    if (c.errors['minlength']) {
      return `Must be at least ${c.errors['minlength'].requiredLength} characters.`;
    }
    if (c.errors['email']) return 'Enter a valid email address.';

    return 'Invalid value.';
  }

}
