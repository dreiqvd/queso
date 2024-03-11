import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-home-about',
  standalone: true,
  imports: [MatTooltip, NgOptimizedImage, AnimationsDirective, IconComponent],
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.scss',
})
export class HomeAboutComponent {
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
  ];
}
