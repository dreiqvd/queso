import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { AnimationsDirective } from '@queso/common';

import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { NavbarComponent } from '../../components/navbar';

@Component({
  selector: 'qs-contact',
  standalone: true,
  imports: [
    MatTooltip,
    NavbarComponent,
    ContactFormComponent,
    AnimationsDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly greetingTxt = 'hello'.split('');
}
