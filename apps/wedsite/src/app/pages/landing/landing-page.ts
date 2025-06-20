import { Component } from '@angular/core';

import { HeroSection } from './hero-section/hero-section';

@Component({
  imports: [HeroSection],
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
})
export class LandingPage {}
