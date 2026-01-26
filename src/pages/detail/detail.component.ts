import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardComponent } from '../../components-shared/card/card.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './detail.html',
})
export class DetailComponent {
  private readonly route = inject(ActivatedRoute);
  id = computed(() => this.route.snapshot.paramMap.get('id'));
}
