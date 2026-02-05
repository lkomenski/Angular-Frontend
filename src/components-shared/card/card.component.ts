import { Component, Input } from '@angular/core';

/**
 * Reusable card layout wrapper with content projection
 */
@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html'
})
export class CardComponent {
  @Input() ariaLabel = 'Card';
}
