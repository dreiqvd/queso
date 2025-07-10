import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

import { QsDialogComponent } from '@queso/ui-kit/dialog';
import { QsIcon } from '@queso/ui-kit/icon';

import { DressCodeRole } from '../dress-code-page';

@Component({
  selector: 'app-dress-code-details',
  imports: [
    NgTemplateOutlet,
    NgOptimizedImage,
    MatButtonModule,
    MatTooltip,
    QsIcon,
  ],
  templateUrl: './dress-code-details.html',
})
export class DressCodeDetails extends QsDialogComponent {
  data!: {
    role: DressCodeRole;
  };
}
