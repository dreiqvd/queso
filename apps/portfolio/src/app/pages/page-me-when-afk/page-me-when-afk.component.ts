import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';

import { PageContainerComponent } from '../../shared/page-container/page-container.component';

@Component({
  selector: 'qs-me-when-afk',
  standalone: true,
  imports: [
    RouterLink,
    MatTooltip,
    AnimationsDirective,
    PageContainerComponent,
    IconComponent,
  ],
  templateUrl: './page-me-when-afk.component.html',
})
export class PageMeWhenAfkComponent {}
