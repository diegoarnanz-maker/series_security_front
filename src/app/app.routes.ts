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

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

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

  { path: '**', redirectTo: 'login' },
];
