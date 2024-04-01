import { Component } from '@angular/core';

import { SearchFormComponent } from './components/search-form';

@Component({
  standalone: true,
  imports: [SearchFormComponent],
  selector: 'qs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'nearbai';
}
