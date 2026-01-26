import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { CardComponent } from '../../components-shared/card/card.component';
import { FormFieldComponent } from '../../components-shared/form-field/form-field.component';

type ItemForm = {
  name: FormControl<string>;
  category: FormControl<string>;
};

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CardComponent, FormFieldComponent],
  templateUrl: './edit.html',
})
export class CreateEditComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly idParam = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('id'))),
    { initialValue: null },
  );

  id = computed(() => this.idParam());
  mode = computed(() => (this.id() ? 'Edit' : 'Create'));

  // Reactive form + validators 
  form = new FormGroup<ItemForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  // Derived state (like your canSave, but based on form validity)
  canSave = computed(() => this.form.valid);

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('SAVE (stub)', {
      mode: this.mode(),
      id: this.id(),
      ...this.form.getRawValue(),
    });

    alert('Saved (stub). Check console for output.');
  }
}
