import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ListComponent } from '../pages/list/list.component';
import { DetailComponent } from '../pages/detail/detail.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { CreateEditComponent } from '../pages/edit/edit.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'items', component: ListComponent },
  { path: 'items/:id', component: DetailComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'create', component: CreateEditComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: CreateEditComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
