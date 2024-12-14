import {
  AuthGuard,
  AuthPipe,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Route } from '@angular/router';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';

const redirectUnauthorizedToLogin = (): AuthPipe =>
  redirectUnauthorizedTo(['login']);

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'bills',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/bills/bills.component').then((m) => m.BillsComponent),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'income',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/income/income.component').then(
        (m) => m.IncomeComponent
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
];
