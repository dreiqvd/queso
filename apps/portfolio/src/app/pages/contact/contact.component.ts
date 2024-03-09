import { Component } from '@angular/core';

import { AnimationsDirective } from '@queso/common';

import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { NavbarComponent } from '../../components/navbar';

@Component({
  selector: 'qs-contact',
  standalone: true,
  imports: [NavbarComponent, ContactFormComponent, AnimationsDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly greetingTxt = 'hello'.split('');
}
