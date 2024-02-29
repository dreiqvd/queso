import { Component } from '@angular/core';

import { SOCIAL_LINKS } from '@queso/common';

import { ContactFormComponent } from '../../../../components/contact-form/contact-form.component';

@Component({
  selector: 'qs-home-contact',
  standalone: true,
  imports: [ContactFormComponent],
  templateUrl: './home-contact.component.html',
  styleUrl: './home-contact.component.scss',
})
export class HomeContactComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
