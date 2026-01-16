import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.css'],
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';

  @Output() valueChange = new EventEmitter<string>();

  onInput(evt: Event) {
    this.valueChange.emit((evt.target as HTMLInputElement).value);
  }
}
