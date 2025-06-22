import { Route } from '@angular/router';

import { LandingPage } from './pages/landing/landing-page.component';

export const appRoutes: Route[] = [
  { path: '', component: LandingPage, pathMatch: 'full' },
  {
    path: 'contact',
    pathMatch: 'full',
    title: 'Connect',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((c) => c.ContactPage),
  },
  {
    path: 'projects',
    pathMatch: 'full',
    title: 'Projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then((c) => c.ProjectsPage),
  },
  {
    path: 'blog',
    pathMatch: 'full',
    title: 'Blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then((c) => c.BlogPage),
  },
  {
    path: 'me-when-afk',
    pathMatch: 'full',
    title: 'Away From Keyboard',
    loadComponent: () =>
      import('./pages/me-when-afk/me-when-afk.component').then(
        (c) => c.MeWhenAfkPage
      ),
  },
  { path: '**', redirectTo: '' }, // TODO: Implement a 404 page for the fallback route
];
