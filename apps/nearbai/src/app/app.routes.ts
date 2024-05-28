import { Route } from '@angular/router';

import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }, // TODO: Implement a 404 page for the fallback route
];
