import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly auth = inject(Auth);
  private readonly route = inject(Router);

  signOut(): void {
    this.auth.signOut().then(() => {
      this.route.navigate(['/login']);
    });
  }
}
