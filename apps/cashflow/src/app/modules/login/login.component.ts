import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QsFormFieldDirective } from '@queso/ui-kit/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    QsFormFieldDirective,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth: Auth = inject(Auth);

  readonly loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onLogin(): void {
    const { username, password } = this.loginForm.value;
    console.log(username, password);
    // this.auth.signInWithEmailAndPassword(username, password);
  }
}
