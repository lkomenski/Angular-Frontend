import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html'
})
export class TableComponent {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() rows: any[] = [];
  @Output() rowClick = new EventEmitter<any>();

  trackByIndex = (index: number, item: any) => index;

  onRowKeydown(event: KeyboardEvent, row: any) {
    // Allow Enter and Space to activate the row (accessibility)
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.rowClick.emit(row);
    }
  }
}
