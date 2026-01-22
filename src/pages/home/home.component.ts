import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Add required properties that are used in the template
  liveMessage = signal('Welcome to the home page');
  stats = signal({ total: 0, categories: 0, latest: 0 });
  query = signal('');
  filtered = signal([]);
  showTips = signal(false);
  recent = signal([]);

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
