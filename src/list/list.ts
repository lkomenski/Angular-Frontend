import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../components-shared/card/card';
import { TableComponent } from '../components-shared/table/table';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CardComponent, TableComponent],
  templateUrl: './list.html',
})
export class ListComponent {}
