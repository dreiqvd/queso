import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Navigation } from './components/navigation/navigation';

@Component({
  imports: [RouterModule, Navigation],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
