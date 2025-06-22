import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { SOCIAL_LINKS } from '@queso/common';
import { QsAnimations } from '@queso/common/animations';

import { ContactForm } from '../../../../components/contact-form';

@Component({
  selector: 'app-landing-contact',
  imports: [MatTooltip, QsAnimations, ContactForm],
  templateUrl: './landing-contact.component.html',
})
export class LandingContact {
  readonly socialLinks = SOCIAL_LINKS;
}
