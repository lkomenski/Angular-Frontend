import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class CardComponent {
  @Input() ariaLabel = 'Card';
}
