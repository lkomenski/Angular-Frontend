import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components-shared/card/card.component';

type Item = { id: number; name: string; category: string; updated: string };

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, CardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Add required properties that are used in the template
  liveMessage = signal('Welcome to the home page');
  stats = signal({ total: 0, categories: 0, latest: 0 });
  query = signal('');
  filtered = signal<Item[]>([]);
  showTips = signal(false);
  recent = signal<Item[]>([]);

  // Add required methods
  clearSearch() {
    this.query.set('');
  }

  setQuery(value: string) {
    this.query.set(value);
  }

  onSearchKeydown(event: KeyboardEvent) {
    // Handle search keydown
  }

  toggleTips() {
    this.showTips.update(current => !current);
  }
}

// Export as both Home and HomeComponent for compatibility
export { HomeComponent as Home };
