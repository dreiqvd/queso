import { Component, signal } from '@angular/core';

import { CountdownFlipCard } from '../../../components/countdown-flip-card/countdown-flip-card';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  imports: [CountdownFlipCard],
})
export class HeroSection {
  readonly mainHeadingText = signal<string[]>('Drei + Tricia'.split(''));
}
