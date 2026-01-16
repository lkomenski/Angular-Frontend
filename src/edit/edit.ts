import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../components-shared/card/card';
import { FormFieldComponent } from '../components-shared/form-field/form-field';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CardComponent, FormFieldComponent],
  templateUrl: './edit.html',
})
export class EditComponent {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
}
