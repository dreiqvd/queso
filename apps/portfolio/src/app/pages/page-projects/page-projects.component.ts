import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';

import { PageContainerComponent } from '../../shared/page-container/page-container.component';

@Component({
  selector: 'qs-page-projects',
  standalone: true,
  imports: [
    RouterLink,
    MatTooltip,
    PageContainerComponent,
    AnimationsDirective,
    IconComponent,
  ],
  templateUrl: './page-projects.component.html',
})
export class PageProjectsComponent {}
