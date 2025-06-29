import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';

import { IconStyle, QsIcon } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, QsIcon],
  templateUrl: './navbar.component.html',
  styles: `
    a {
      &.active {
        background-color: var(--color-accent-300);
      }
    }
  `,
})
export class Navbar {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly routes = [
    {
      path: '/',
      label: 'Dashboard',
      icon: 'dashboard',
      iconStyle: 'custom' as IconStyle,
    },
    {
      path: '/bills',
      label: 'Bills',
      icon: 'coins',
      iconStyle: 'light' as IconStyle,
    },
    {
      path: '/budgets',
      label: 'Budgets',
      icon: 'chart-pie',
      iconStyle: 'light' as IconStyle,
    },
  ];

  signOut(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
