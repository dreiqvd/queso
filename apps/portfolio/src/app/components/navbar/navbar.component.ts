import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { SOCIAL_LINKS } from '@queso/common';
import { HamburgerComponent } from '@queso/ui-kit/hamburger';
import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-navbar',
  standalone: true,
  imports: [CommonModule, MatTooltip, IconComponent, HamburgerComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly socials = SOCIAL_LINKS;
}
