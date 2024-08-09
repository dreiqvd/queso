import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { SOCIAL_LINKS } from '@queso/common';
import { QsAnimationsDirective } from '@queso/common/directives';

import { ContactFormComponent } from '../../../../components/contact-form';

@Component({
  selector: 'app-landing-contact',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatTooltip,
    QsAnimationsDirective,
    ContactFormComponent,
  ],
  templateUrl: './landing-contact.component.html',
})
export class LandingContactComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
