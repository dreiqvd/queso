import { Route } from '@angular/router';

import { PageHomeComponent } from './pages/page-home/page-home.component';

export const appRoutes: Route[] = [
  { path: '', component: PageHomeComponent, pathMatch: 'full' },
  {
    path: 'contact',
    pathMatch: 'full',
    title: 'Connect',
    loadComponent: () =>
      import('./pages/page-contact/page-contact.component').then(
        (c) => c.PageContactComponent
      ),
  },
  {
    path: 'projects',
    pathMatch: 'full',
    title: 'Projects',
    loadComponent: () =>
      import('./pages/page-projects/page-projects.component').then(
        (c) => c.PageProjectsComponent
      ),
  },
  {
    path: 'blog',
    pathMatch: 'full',
    title: 'Blog',
    loadComponent: () =>
      import('./pages/page-blog/page-blog.component').then(
        (c) => c.PageBlogComponent
      ),
  },
  {
    path: 'me-when-afk',
    pathMatch: 'full',
    title: 'Away From Keyboard',
    loadComponent: () =>
      import('./pages/page-me-when-afk/page-me-when-afk.component').then(
        (c) => c.PageMeWhenAfkComponent
      ),
  },
  { path: '**', redirectTo: '' }, // TODO: Implement a 404 page for the fallback route
];
