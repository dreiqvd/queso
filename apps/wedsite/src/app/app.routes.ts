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
    path: 'dress-code',
    loadComponent: () =>
      import('./pages/dress-code/dress-code-page').then((m) => m.DressCodePage),
  },
  {
    path: 'our-story',
    loadComponent: () =>
      import('./pages/our-story/our-story-page').then((m) => m.OurStoryPage),
  },
  {
    path: 'celebrate',
    loadComponent: () =>
      import('./pages/invitation/invitation-page').then(
        (m) => m.InvitationPage
      ),
  },
];
