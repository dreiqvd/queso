import {
  AuthGuard,
  AuthPipe,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Route } from '@angular/router';

import { ExpensesComponent } from './modules/expenses/expenses.component';
import { LoginComponent } from './modules/login/login.component';

const redirectUnauthorizedToLogin = (): AuthPipe =>
  redirectUnauthorizedTo(['login']);

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'expenses',
  },
  {
    path: 'expenses',
    pathMatch: 'full',
    component: ExpensesComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
];
