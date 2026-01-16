import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.css'],
})
export class FormFieldComponent {
  @Input() label = '';
}
