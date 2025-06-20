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
      fragment: 'home',
    },
    {
      label: 'Details',
      fragment: 'details',
    },
    {
      label: 'RSVP',
      fragment: 'rsvp',
    },
    {
      label: 'FAQs',
      fragment: 'faqs',
    },
    {
      label: 'Registry',
      fragment: 'registry',
    },
    {
      label: 'Media',
      fragment: 'media',
    },
  ];
}
