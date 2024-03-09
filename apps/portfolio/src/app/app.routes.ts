import { Route } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, pathMatch: 'full', title: 'Home' },
  {
    path: 'contact',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (c) => c.ContactComponent
      ),
  },
];
