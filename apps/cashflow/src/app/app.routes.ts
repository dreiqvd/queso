import { Route } from '@angular/router';

import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
];
