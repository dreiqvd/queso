import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { AnimationsDirective, SOCIAL_LINKS } from '@queso/common';
import { HamburgerComponent } from '@queso/ui-kit/hamburger';
import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltip,
    IconComponent,
    HamburgerComponent,
    AnimationsDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('sidebar', { read: AnimationsDirective })
  sidebar!: AnimationsDirective;

  readonly socials = SOCIAL_LINKS;
  readonly isSidebarOpen = signal(false);

  onSidebarBtnClick(event: MouseEvent): void {
    event.stopPropagation();
    this.sidebar.animate('slideOutLeft').then(() => {
      this.isSidebarOpen.set(false);
    });
  }
}
