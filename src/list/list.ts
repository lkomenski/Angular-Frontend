import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../components-shared/card/card';
import { TableComponent } from '../components-shared/table/table';

type Item = { id: number; name: string; category: string };

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, TableComponent],
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
})
export class ListComponent {
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
  ];

  rows: Item[] = [
    { id: 1, name: 'Alpha', category: 'Demo' },
    { id: 2, name: 'Beta', category: 'Demo' },
    { id: 3, name: 'Gamma', category: 'Demo' },
  ];

  constructor(private router: Router) {}

  openDetail(row: Item) {
    this.router.navigate(['/detail', row.id]);
  }
}
