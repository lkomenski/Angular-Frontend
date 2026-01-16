import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardComponent } from '../components-shared/card/card';
import { FormFieldComponent } from '../components-shared/form-field/form-field';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, CardComponent, FormFieldComponent],
  templateUrl: './edit.html',
})
export class EditComponent {
  private route = inject(ActivatedRoute);

  id = computed(() => this.route.snapshot.paramMap.get('id')); // null on /create
  mode = computed(() => (this.id() ? 'Edit' : 'Create'));

  name = '';
  category = '';

  save() {
    console.log('SAVE (stub)', {
      mode: this.mode(),
      id: this.id(),
      name: this.name,
      category: this.category,
    });
    alert('Saved (stub). Check console for output.');
  }
}
