import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeroSection } from './hero-section/hero-section';

@Component({
  imports: [RouterLink, HeroSection],
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
})
export class LandingPage {
  readonly navItems = [
    {
      label: 'Home',
      route: '/home',
    },
    {
      label: 'Details',
      route: '/details',
    },
    {
      label: 'RSVP',
      route: '/rsvp',
    },
    {
      label: 'FAQs',
      route: '/faqs',
    },
    {
      label: 'Registry',
      route: '/registry',
    },
    {
      label: 'Media',
      route: '/media',
    },
  ];
}
