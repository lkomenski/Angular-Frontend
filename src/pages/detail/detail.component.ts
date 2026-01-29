import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardComponent } from '../../components-shared/card/card.component';

/**
 * Detail component that reads route parameters
 */
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './detail.html',
})
export class DetailComponent {
  private readonly route = inject(ActivatedRoute);

  /** Extract 'id' parameter from current route */
  id = computed(() => this.route.snapshot.paramMap.get('id'));
}
