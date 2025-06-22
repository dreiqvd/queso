import { Route } from '@angular/router';

import { App } from './app.component';

export const appRoutes: Route[] = [
  { path: '', component: App, pathMatch: 'full' },
  { path: '**', redirectTo: '' }, // TODO: Implement a 404 page for the fallback route
];
