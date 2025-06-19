import { Component } from '@angular/core';

import { CountdownFlipCard } from '../../components/countdown-flip-card/countdown-flip-card';

@Component({
  imports: [CountdownFlipCard],
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  standalone: true,
})
export class LandingPage {}
