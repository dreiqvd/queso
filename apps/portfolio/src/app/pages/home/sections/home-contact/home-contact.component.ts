import { Component } from '@angular/core';

import { AnimationsDirective, SOCIAL_LINKS } from '@queso/common';

import { ContactFormComponent } from '../../../../components/contact-form/contact-form.component';

@Component({
  selector: 'qs-home-contact',
  standalone: true,
  imports: [ContactFormComponent, AnimationsDirective],
  templateUrl: './home-contact.component.html',
  styleUrl: './home-contact.component.scss',
})
export class HomeContactComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
