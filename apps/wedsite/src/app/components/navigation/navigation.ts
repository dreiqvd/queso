import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { QsIcon } from '@queso/ui-kit/icon';
import { QsSlidebar } from '@queso/ui-kit/slidebar';

import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, MatButtonModule, MatTooltip, QsSlidebar, QsIcon],
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
  public readonly navigationService = inject(NavigationService);

  protected readonly isSidebarOpen = signal(false);
  protected readonly footerLinks = [
    { label: 'Home', route: '/' },
    { label: 'Dress Code', route: '/dress-code' },
    { label: 'Registry', route: '/registry' },
    { label: 'Our Story', route: '/our-story' },
    { label: 'Our Cats', route: '/miming-patrol' },
  ];
}
