import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { QsAnimations } from '@queso/common/animations';
import { QsIcon } from '@queso/ui-kit/icon';

import { PageContainer } from '../../components/page-container';

@Component({
  selector: 'app-me-when-afk',
  imports: [RouterLink, MatTooltip, QsAnimations, QsIcon, PageContainer],
  templateUrl: './me-when-afk.component.html',
})
export class MeWhenAfkPage {}
