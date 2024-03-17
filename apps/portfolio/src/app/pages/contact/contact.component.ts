import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { AnimationsDirective } from '@queso/common/directives';

import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { NavbarComponent } from '../../components/navbar';

@Component({
  selector: 'qs-contact',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatTooltip,
    NavbarComponent,
    ContactFormComponent,
    AnimationsDirective,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly greetingTxt = 'hello'.split('');
  readonly messages = [
    "Clarifications? Questions? Let's <br /> hear them — I won't bite.",
    'My inbox is always open!',
  ];
}
