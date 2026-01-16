import { Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../components-shared/card/card';

type Item = {
  id: number;
  name: string;
  category: string;
  updated: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  // Core state (signals)
  query = signal('');
  showTips = signal(true);
  liveMessage = signal(''); // aria-live announcement

  items = signal<Item[]>([
    { id: 1, name: 'Alpha', category: 'Demo', updated: 'Today' },
    { id: 2, name: 'Beta', category: 'Demo', updated: 'Yesterday' },
    { id: 3, name: 'Gamma', category: 'Demo', updated: '2 days ago' },
    { id: 4, name: 'Nova', category: 'Youthful', updated: 'This week' },
    { id: 5, name: 'Pulse', category: 'Modern', updated: 'This week' },
  ]);

  // Derived state (computed)
  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.items();
    return this.items().filter(
      (x) =>
        x.name.toLowerCase().includes(q) ||
        x.category.toLowerCase().includes(q) ||
        String(x.id).includes(q),
    );
  });

  recent = computed(() => this.items().slice(0, 3));

  stats = computed(() => {
    const list = this.items();
    return {
      total: list.length,
      categories: new Set(list.map((x) => x.category)).size,
      latest: list[0]?.updated ?? '—',
    };
  });

  // A11y: announce result count when search changes
  private announceEffect = effect(() => {
    const count = this.filtered().length;
    const q = this.query().trim();
    this.liveMessage.set(
      q ? `${count} result${count === 1 ? '' : 's'} for "${q}".` : `${count} items available.`,
    );
  });

  setQuery(v: string) {
    this.query.set(v);
  }

  clearSearch() {
    this.query.set('');
  }

  toggleTips() {
    this.showTips.set(!this.showTips());
  }

  // Keyboard support: Escape clears search, "/" focuses search (optional)
  onSearchKeydown(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.clearSearch();
    }
  }
}
