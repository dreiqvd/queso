import { Component, signal, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SOCIAL_LINKS } from '@queso/common';
import { AnimationsDirective } from '@queso/common/directives';
import { HamburgerComponent } from '@queso/ui-kit/hamburger';
import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-navbar',
  standalone: true,
  imports: [
    MatTooltip,
    IconComponent,
    HamburgerComponent,
    AnimationsDirective,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('sidebar', { read: AnimationsDirective })
  sidebar!: AnimationsDirective;

  readonly socials = SOCIAL_LINKS;
  readonly isSidebarOpen = signal(false);
  readonly routes = [
    { name: 'home', path: '', label: 'Home' },
    { name: 'blog', path: '/blog', label: 'Blog' },
    { name: 'projects', path: '/projects', label: 'Projects' },
    { name: 'contact', path: '/contact', label: 'Contact' },
  ];

  onOpenSidebar(event: MouseEvent): void {
    event.stopPropagation();
    this.isSidebarOpen.set(true);
    setTimeout(() => {
      this.sidebar.animate('slideInLeft');
    });
  }

  onCloseSidebar(event: MouseEvent): void {
    event.stopPropagation();
    this.sidebar.animate('slideOutLeft').then(() => {
      this.isSidebarOpen.set(false);
    });
  }
}
