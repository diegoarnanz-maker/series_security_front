import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { DashboardComponent as AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DashboardComponent as UserDashboardComponent } from './pages/user/dashboard/dashboard.component';

import { authGuard } from './security/guards/auth.guard';
import { adminGuard } from './security/guards/admin.guard';
import { SeriesManagementComponent } from './pages/admin/series-management/series-management.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { ReviewsManagementComponent } from './pages/admin/reviews-management/reviews-management.component';
import { SeriesDetailComponent } from './components/series/series-detail/series-detail.component';
import { SeriesFormComponent } from './components/series/series-form/series-form.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { SerieListUserComponent } from './pages/user/serie-list-user/serie-list-user.component';
import { SeriesFavoritesComponent } from './pages/user/series-favorites/series-favorites.component';
import { ReviewsUserComponent } from './pages/user/reviews-user/reviews-user.component';
import { MiPerfilComponent } from './pages/user/mi-perfil/mi-perfil.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // **Panel de Administración**
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },

  // **Secciones Administrativas**
  {
    path: 'admin/series-management',
    component: SeriesManagementComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/user-management',
    component: UserManagementComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/reviews-management',
    component: ReviewsManagementComponent,
    canActivate: [adminGuard],
  },
  // **Series**
  { path: 'series/:id', component: SeriesDetailComponent },
  {
    path: 'admin/series-edit/:id',
    component: SeriesFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/series-add/:id',
    component: SeriesFormComponent,
    canActivate: [adminGuard],
  },

  // **Panel de Usuario**
  {
    path: 'users/:id',
    component: UserDetailComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/user-add',
    component: UserFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/user-edit/:id',
    component: UserFormComponent,
    canActivate: [adminGuard],
  },

  // Seccion de Usuario authenticated
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard],
  },
  // **Secciones del Usuario**
  { path: 'series', component: SerieListUserComponent, canActivate: [authGuard] },
  { path: 'favorites', component: SeriesFavoritesComponent, canActivate: [authGuard] },
  { path: 'reviews', component: ReviewsUserComponent, canActivate: [authGuard] },
  { path: 'perfil', component: MiPerfilComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' },
];
