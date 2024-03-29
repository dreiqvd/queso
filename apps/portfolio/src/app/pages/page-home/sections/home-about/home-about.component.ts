import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-home-about',
  standalone: true,
  imports: [
    RouterLink,
    MatTooltip,
    NgOptimizedImage,
    AnimationsDirective,
    IconComponent,
  ],
  templateUrl: './home-about.component.html',
})
export class HomeAboutComponent {
  // Event that is emitted when the user clicks on the CTA button
  @Output() ctaClick = new EventEmitter<void>();

  readonly aboutItems = [
    {
      text: 'From pixels to databases — 6+ of years building things on the web.',
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
