import {
  AuthGuard,
  AuthPipe,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Route } from '@angular/router';

import { Dashboard } from './modules/dashboard/dashboard.component';
import { Login } from './modules/login/login.component';

const redirectUnauthorizedToLogin = (): AuthPipe =>
  redirectUnauthorizedTo(['login']);

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: Dashboard,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'bills',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/bills/bills.component').then((m) => m.Bills),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'budgets',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/budgets/budgets.component').then((m) => m.Budgets),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'login', pathMatch: 'full', component: Login },
];
