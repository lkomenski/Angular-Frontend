import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from '../../components-shared/card/card.component';
import { TableComponent } from '../../components-shared/table/table.component';

type Item = { id: number; name: string; category: string };

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CardComponent, TableComponent],
  templateUrl: './list.html',
})
export class ListComponent {
  query = signal('');

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
  ];

  rows = signal<Item[]>([
    { id: 1, name: 'Alpha', category: 'Demo' },
    { id: 2, name: 'Beta', category: 'Demo' },
    { id: 3, name: 'Gamma', category: 'Demo' },
    { id: 4, name: 'Nova', category: 'Youthful' },
  ]);

  filteredRows = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.rows();
    return this.rows().filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        String(r.id).includes(q),
    );
  });

  constructor(private router: Router) {}

  openDetail(row: Item) {
    this.router.navigate(['/detail', row.id]);
  }
}
