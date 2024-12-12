import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { QsAnimationsDirective } from '@queso/common/animations';

import { ContactFormComponent } from '../../components/contact-form';
import { PageContainerComponent } from '../../components/page-container';

@Component({
  selector: 'app-contact',
  imports: [
    NgOptimizedImage,
    MatTooltip,
    QsAnimationsDirective,
    PageContainerComponent,
    ContactFormComponent,
  ],
  templateUrl: './contact.component.html',
})
export class PageContactComponent {
  readonly greetingTxt = 'hello'.split('');
  readonly messages = [
    "Clarifications? Questions? Let's <br /> hear them — I won't bite.",
    'My inbox is always open!',
  ];
}
