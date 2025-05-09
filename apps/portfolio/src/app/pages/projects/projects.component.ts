import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { QsAnimationsDirective } from '@queso/common/animations';
import { QsIconComponent } from '@queso/ui-kit/icon';
import { QsPillComponent } from '@queso/ui-kit/pill';

import { PageContainerComponent } from '../../components/page-container';

@Component({
  selector: 'app-page-projects',
  imports: [
    MatTooltip,
    PageContainerComponent,
    QsAnimationsDirective,
    QsIconComponent,
    QsPillComponent,
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
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
