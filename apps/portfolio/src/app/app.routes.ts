import { Route } from '@angular/router';

import { PageHomeComponent } from './pages/page-home/page-home.component';

export const appRoutes: Route[] = [
  { path: '', component: PageHomeComponent, pathMatch: 'full', title: 'Home' },
  {
    path: 'contact',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/page-contact/page-contact.component').then(
        (c) => c.PageContactComponent
      ),
    title: 'Connect',
  },
  {
    path: 'me-when-afk',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/page-me-when-afk/page-me-when-afk.component').then(
        (c) => c.PageMeWhenAfkComponent
      ),
    title: 'Away From Keyboard',
  },
];
