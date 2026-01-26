import { Routes } from '@angular/router';

import { AdminComponent } from '../../pages/admin/admin.component';
import { CreateEditComponent } from '../../pages/edit/edit.component';
import { authGuard } from '../../guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] }, // /admin
  { path: 'create', component: CreateEditComponent, canActivate: [authGuard] }, // /create
  { path: 'edit/:id', component: CreateEditComponent, canActivate: [authGuard] } // /edit/123
];
