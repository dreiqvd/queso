import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { QsAnimationsDirective } from '@queso/common/animations';
import { QsIconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-landing-about',
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatTooltip,
    QsAnimationsDirective,
    QsIconComponent,
  ],
  templateUrl: './landing-about.component.html',
})
export class LandingAboutComponent {
  // Event that is emitted when the user clicks on the CTA button
  @Output() ctaClick = new EventEmitter<void>();

  readonly aboutItems = [
    {
      text: 'From pixels to databases — 7+ of years building things on the web.',
      delay: 0.5,
    },
    {
      text: 'Can juggle between the looks (frontend) and the brains (backend).',
      delay: 0.75,
    },
    { text: 'Got a knack for UI design, I think? 😅', delay: 1 },
    {
      text: 'Always up to the challenge of learning new tools and technologies.',
      delay: 1.25,
    },
    {
      text: "Here's me when AFK",
      delay: 1.5,
      isLink: true,
    },
  ];
}
