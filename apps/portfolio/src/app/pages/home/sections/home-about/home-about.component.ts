import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-home-about',
  standalone: true,
  imports: [IconComponent, MatTooltip],
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.scss',
})
export class HomeAboutComponent {}
