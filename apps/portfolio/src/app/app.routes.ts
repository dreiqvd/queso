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
    title: 'Connect',
  },
  {
    path: 'me-when-afk',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/me-when-afk/me-when-afk.component').then(
        (c) => c.MeWhenAfkComponent
      ),
    title: 'Away From Keyboard',
  },
];
