import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardComponent } from '../components-shared/card/card';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './detail.html',
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
}
