import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';

import { IconStyle, QsIconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, QsIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
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
