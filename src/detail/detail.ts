import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardComponent } from '../components-shared/card/card';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  id = computed(() => this.route.snapshot.paramMap.get('id'));
}
