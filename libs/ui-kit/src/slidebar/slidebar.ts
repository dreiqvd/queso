import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

import { QsIcon } from '../icon';

/** Sidebar with slide animation */
@Component({
  selector: 'qs-slidebar',
  imports: [MatButtonModule, MatTooltip, QsIcon],
  templateUrl: './slidebar.html',
})
export class QsSlidebar {
  isSidebarOpen = input.required();
  position = input<'left' | 'right'>('left');
  closed = output<void>();
}
