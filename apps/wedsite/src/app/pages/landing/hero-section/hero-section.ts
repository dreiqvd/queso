import { Component, signal } from '@angular/core';

import { QsCountdownFlipCard } from '@queso/ui-kit/countdown-flip-card';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  imports: [QsCountdownFlipCard],
})
export class HeroSection {
  protected readonly mainHeadingText = signal<string[]>(
    'Drei + Tricia'.split('')
  );
}
