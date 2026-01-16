import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home';
import { ListComponent } from '../list/list';
import { DetailComponent } from '../detail/detail';
import { EditComponent } from '../edit/edit';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'create', component: EditComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
