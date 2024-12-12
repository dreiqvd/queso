import { Component } from '@angular/core';

import { NavbarComponent } from '../navbar';

/** This is a generic component that wraps up a standard app page */
@Component({
  selector: 'app-page-container',
  imports: [NavbarComponent],
  templateUrl: './page-container.component.html',
})
export class PageContainerComponent {}
