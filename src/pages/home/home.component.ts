import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components-shared/card/card.component';
import { DataCollectionFormComponent } from '../../components-shared/data-collection-form/data-collection-form.component';

// Type definition for Item objects
type Item = { id: number; name: string; category: string; updated: string };

/**
 * Home component with Angular Signals and search functionality
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, CardComponent, DataCollectionFormComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Angular Signals for reactive state
  liveMessage = signal('Welcome to the home page');
  stats = signal({ total: 0, categories: 0, latest: 0 });
  query = signal('');
  filtered = signal<Item[]>([]);
  showTips = signal(false);
  recent = signal<Item[]>([]);

  clearSearch() {
    this.query.set('');
  }

  setQuery(value: string) {
    this.query.set(value);
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearSearch();
    }
  }

  toggleTips() {
    this.showTips.update(current => !current);
  }
}

// Export as both Home and HomeComponent for compatibility
export { HomeComponent as Home };
