import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';

import { IconStyle, QsIconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, QsIconComponent],
  templateUrl: './navbar.component.html',
  styles: `
    a {
      &.active {
        background-color: var(--color-accent-300);
      }
    }
  `,
})
export class NavbarComponent {
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
      path: '/expenses',
      label: 'Expenses',
      icon: 'coins',
      iconStyle: 'light' as IconStyle,
    },
  ];

  signOut(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
