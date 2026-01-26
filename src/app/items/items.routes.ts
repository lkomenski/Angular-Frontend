import { Routes } from '@angular/router';

import { ListComponent } from '../../pages/list/list.component';
import { DetailComponent } from '../../pages/detail/detail.component';

export const ITEMS_ROUTES: Routes = [
  { path: '', component: ListComponent },     // /items
  { path: ':id', component: DetailComponent } // /items/123
];
