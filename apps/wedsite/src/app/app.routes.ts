import { Route } from '@angular/router';

import { LandingPage } from './pages/landing/landing-page';

export const appRoutes: Route[] = [
  { path: '', component: LandingPage, pathMatch: 'full' },
  {
    path: 'registry',
    loadComponent: () =>
      import('./pages/gift-registry/gift-registry-page').then(
        (m) => m.GiftRegistryPage
      ),
  },
  {
    path: 'our-story',
    loadComponent: () =>
      import('./pages/our-story/our-story-page').then((m) => m.OurStoryPage),
  },
];
