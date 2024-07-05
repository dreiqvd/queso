import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { SOCIAL_LINKS } from '@queso/common';
import { QsAnimationsDirective } from '@queso/common/directives';

import { ContactFormComponent } from '../../../../components/contact-form';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatTooltip,
    QsAnimationsDirective,
    ContactFormComponent,
  ],
  templateUrl: './home-contact.component.html',
})
export class HomeContactComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
