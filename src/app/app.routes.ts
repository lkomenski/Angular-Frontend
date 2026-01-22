import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Feature section: items (list + detail)
  {
    path: 'items',
    loadChildren: () => import('./items/items.routes').then(m => m.ITEMS_ROUTES),
  },

  // Feature section: admin (create/edit guarded) — kept at root paths
  {
    path: '',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },

  { path: '**', redirectTo: '' },
];
