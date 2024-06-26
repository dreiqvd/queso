import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { SOCIAL_LINKS } from '@queso/common';
import { AnimationsDirective } from '@queso/common/directives';

import { ContactFormComponent } from '../../../../shared/contact-form';

@Component({
  selector: 'qs-home-contact',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatTooltip,
    ContactFormComponent,
    AnimationsDirective,
  ],
  templateUrl: './home-contact.component.html',
})
export class HomeContactComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
