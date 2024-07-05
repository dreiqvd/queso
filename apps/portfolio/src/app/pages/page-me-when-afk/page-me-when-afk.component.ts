import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { QsAnimationsDirective } from '@queso/common/directives';
import { QsIconComponent } from '@queso/ui-kit/icon';

import { PageContainerComponent } from '../../components/page-container';

@Component({
  selector: 'app-me-when-afk',
  standalone: true,
  imports: [
    RouterLink,
    MatTooltip,
    QsAnimationsDirective,
    QsIconComponent,
    PageContainerComponent,
  ],
  templateUrl: './page-me-when-afk.component.html',
})
export class PageMeWhenAfkComponent { }
