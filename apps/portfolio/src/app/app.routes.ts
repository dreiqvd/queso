import { Route } from '@angular/router';

import { LandingPageComponent } from './pages/landing/landing-page.component';

export const appRoutes: Route[] = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'contact',
    pathMatch: 'full',
    title: 'Connect',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (c) => c.PageContactComponent
      ),
  },
  {
    path: 'projects',
    pathMatch: 'full',
    title: 'Projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (c) => c.ProjectsComponent
      ),
  },
  {
    path: 'blog',
    pathMatch: 'full',
    title: 'Blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then((c) => c.BlogComponent),
  },
  {
    path: 'me-when-afk',
    pathMatch: 'full',
    title: 'Away From Keyboard',
    loadComponent: () =>
      import('./pages/me-when-afk/me-when-afk.component').then(
        (c) => c.MeWhenAfkComponent
      ),
  },
  { path: '**', redirectTo: '' }, // TODO: Implement a 404 page for the fallback route
];
