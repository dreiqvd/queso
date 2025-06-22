import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { QsPlatformService } from '@queso/common/services';
import { QsFormField } from '@queso/ui-kit/form-field';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    QsFormField,
  ],
  templateUrl: './login.component.html',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly route = inject(Router);
  public readonly platformService = inject(QsPlatformService);

  private readonly snackBar = inject(MatSnackBar);

  readonly loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onLogin(): void {
    const { username, password } = this.loginForm.value;
    if (!this.loginForm.valid) return;

    signInWithEmailAndPassword(
      this.auth,
      username as string,
      password as string
    )
      .then(() => {
        this.route.navigate(['']);
      })
      .catch((err) => {
        let message = 'Login failed.';
        if (err.code === 400) {
          message = 'Invalid email or password.';
        }
        this.snackBar.open(message, 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'snackbar-error',
          duration: 2000,
        });
      });
  }
}
