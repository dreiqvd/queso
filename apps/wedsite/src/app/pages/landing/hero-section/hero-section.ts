import { Component, DestroyRef, inject, input, signal } from '@angular/core';

import { QsCountdownFlipCard } from '@queso/ui-kit/countdown-flip-card';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  imports: [QsCountdownFlipCard],
})
export class HeroSection {
  readonly isMobile = input.required<boolean>();

  protected readonly destroyRef = inject(DestroyRef);

  protected readonly mainHeadingText = signal<string[]>(
    'Drei + Tricia'.split('')
  );
}
