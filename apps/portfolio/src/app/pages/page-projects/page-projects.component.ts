import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { QsAnimationsDirective } from '@queso/common/directives';
import { QsIconComponent } from '@queso/ui-kit/icon';
import { QsPillComponent } from '@queso/ui-kit/pill';

import { PageContainerComponent } from '../../components/page-container';

@Component({
  selector: 'app-page-projects',
  standalone: true,
  imports: [
    RouterLink,
    MatTooltip,
    PageContainerComponent,
    QsAnimationsDirective,
    QsIconComponent,
    QsPillComponent,
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
