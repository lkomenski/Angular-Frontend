import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class TableComponent {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() rows: any[] = [];
  @Output() rowClick = new EventEmitter<any>();

  trackByIndex = (i: number) => i;
}
