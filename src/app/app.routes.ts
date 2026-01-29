import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { ListComponent } from '../pages/list/list.component';
import { CreateEditComponent } from '../pages/edit/edit.component';
import { DetailComponent } from '../pages/detail/detail.component';
import { AssignmentsComponent } from '../pages/assignments/assignments.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'list', component: ListComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'create', component: CreateEditComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: CreateEditComponent, canActivate: [authGuard] },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', redirectTo: '' },
];
