import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { QsAnimations } from '@queso/common/animations';
import { QsIcon } from '@queso/ui-kit/icon';

import { PageContainerComponent } from '../../components/page-container';

@Component({
  selector: 'app-me-when-afk',
  imports: [
    RouterLink,
    MatTooltip,
    QsAnimations,
    QsIcon,
    PageContainerComponent,
  ],
  templateUrl: './me-when-afk.component.html',
})
export class MeWhenAfkComponent {}
