import { Component } from '@angular/core';

import { Navbar } from '../navbar';

/** This is a generic component that wraps up a standard app page */
@Component({
  selector: 'app-page-container',
  imports: [Navbar],
  templateUrl: './page-container.component.html',
})
export class PageContainer {}
