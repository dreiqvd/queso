import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { QsSlidebar } from '@queso/ui-kit/slidebar';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, MatButtonModule, MatTooltip, QsSlidebar],
  templateUrl: './navigation.html',
  styles: `
    :host {
      --mat-icon-button-state-layer-size: auto;
    }

    .nav-item {
      &.active a {
        opacity: 1;
        color: #ffc780;
      }
    }
  `,
})
export class Navigation {
  protected readonly isSidebarOpen = signal(false);
  protected readonly footerLinks = [
    { label: 'Home', route: '/' },
    { label: 'Dress Code', route: '/dress-code' },
    { label: 'Registry', route: '/registry' },
    { label: 'Our Story', route: '/our-story' },
    { label: 'Our Cats', route: '/our-cats' },
  ];
}
