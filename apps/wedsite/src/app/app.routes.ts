import { Route } from '@angular/router';

import { LandingPage } from './pages/landing/landing-page';

export const appRoutes: Route[] = [
  { path: '', component: LandingPage, pathMatch: 'full' },
];
