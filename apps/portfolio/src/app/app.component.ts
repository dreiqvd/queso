import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'qs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
