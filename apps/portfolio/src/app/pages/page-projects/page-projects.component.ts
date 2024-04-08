import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { PageContainerComponent } from '../../shared/page-container';

@Component({
  selector: 'qs-page-projects',
  standalone: true,
  imports: [
    RouterLink,
    MatTooltip,
    PageContainerComponent,
    AnimationsDirective,
    IconComponent,
    PillComponent,
  ],
  templateUrl: './page-projects.component.html',
})
export class PageProjectsComponent {
  readonly projects = [
    {
      key: 'nearbai.jpg',
      name: 'NearBai',
      excerpt:
        "A simple place-finder that uses Google Places API to search for nearby places either from a landmark or the user's current location. This is a personal small-scale project to play around with Google Cloud services.",
      tags: ['google-api', 'maps', 'angular'],
      url: 'https://nearbai.dreiq.dev',
    },
  ];
}
