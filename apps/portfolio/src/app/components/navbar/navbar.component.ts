import { Component, signal, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SOCIAL_LINKS } from '@queso/common';
import { QsAnimations } from '@queso/common/animations';
import { QsHamburger } from '@queso/ui-kit/hamburger';
import { QsIcon } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatTooltip,
    QsIcon,
    QsHamburger,
    QsAnimations,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('sidebar', { read: QsAnimations })
  sidebar!: QsAnimations;

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
