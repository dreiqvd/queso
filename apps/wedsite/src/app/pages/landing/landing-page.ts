import {
  afterNextRender,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';

import { DetailsSection } from './details-section/details-section';
import { HeroSection } from './hero-section/hero-section';

@Component({
  imports: [HeroSection, DetailsSection],
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styles: `
    .nav-item.active {
      opacity: 1;

      span {
        &::before {
          content: url('/images/asterisk.svg');
          margin-right: 4px;
        }
      }
    }
  `,
})
export class LandingPage implements OnDestroy {
  @ViewChildren('section') sections!: QueryList<ElementRef<HTMLElement>>;

  readonly activeRoute = signal<string>('home');

  readonly navItems = NAV_ITEMS;
  private intersectionObserver$?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      // Compute the active fragment when section is scrolled into view
      this.intersectionObserver$ = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeRoute.set(entry.target.id);
            }
          });
        },
        { threshold: 0.6 }
      );

      this.sections.forEach((section) => {
        (this.intersectionObserver$ as IntersectionObserver).observe(
          section.nativeElement
        );
      });
    });
  }

  onMenuItemClick(route: string): void {
    const section = this.sections.find((s) => s.nativeElement.id === route);
    if (section) {
      this.activeRoute.set(route);
      section.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver$) {
      this.intersectionObserver$.disconnect();
      this.intersectionObserver$ = undefined;
    }
  }
}

const NAV_ITEMS = [
  {
    label: 'Home',
    route: 'home',
  },
  {
    label: 'Details',
    route: 'details',
  },
  {
    label: 'RSVP',
    route: 'rsvp',
  },
  {
    label: 'FAQs',
    route: 'faqs',
  },
  {
    label: 'Registry',
    route: 'registry',
  },
  {
    label: 'Media',
    route: 'media',
  },
];
