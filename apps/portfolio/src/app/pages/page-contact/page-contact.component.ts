import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { AnimationsDirective } from '@queso/common/directives';

import { ContactFormComponent } from '../../shared/contact-form';
import { PageContainerComponent } from '../../shared/page-container';

@Component({
  selector: 'qs-contact',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatTooltip,
    PageContainerComponent,
    ContactFormComponent,
    AnimationsDirective,
  ],
  templateUrl: './page-contact.component.html',
})
export class PageContactComponent {
  readonly greetingTxt = 'hello'.split('');
  readonly messages = [
    "Clarifications? Questions? Let's <br /> hear them — I won't bite.",
    'My inbox is always open!',
  ];
}
