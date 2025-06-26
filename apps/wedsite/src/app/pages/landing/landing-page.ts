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
import { FAQSSection } from './faqs-section/faqs-section';
import { HashtagSection } from './hashtag-section/hashtag-section';
import { HeroSection } from './hero-section/hero-section';
import { MediaSection } from './media-section/media-section';
import { RegistrySection } from './registry-section/registry-section';
import { RSVPSection } from './rsvp-section/rsvp-section';

@Component({
  imports: [
    HeroSection,
    DetailsSection,
    RSVPSection,
    FAQSSection,
    HashtagSection,
    RegistrySection,
    MediaSection,
  ],
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styles: `
    .nav-item.active {
      opacity: 1;

      span {
        padding-left: 16px;
        position: relative;

        &::before {
          content: '*';
          font-family: 'Anonymous Pro', monospace;
          font-weight: 700;
          position: absolute;
          top: -4px;
          left: 0;
          margin-right: 4px;
        }
      }
    }
  `,
})
export class LandingPage implements OnDestroy {
  @ViewChildren('section') sections!: QueryList<ElementRef<HTMLElement>>;

  protected readonly activeRoute = signal<string>('hello');
  protected readonly isMenuHidden = signal<boolean>(false);

  protected readonly navItems = NAV_ITEMS;
  private disableActiveRouteChecking = false;
  private intersectionObserver$?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      // Compute the active fragment when section is scrolled into view
      this.intersectionObserver$ = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (this.disableActiveRouteChecking) {
              return;
            }
            if (entry.isIntersecting) {
              const elementId = entry.target.id;
              if (elementId === 'hashtag') {
                this.isMenuHidden.set(true);
              } else {
                this.isMenuHidden.set(false);
                this.activeRoute.set(entry.target.id);
              }
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
      // Disable active route checking while scrolling to the view
      this.disableActiveRouteChecking = true;
      this.activeRoute.set(route);
      section.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setTimeout(() => {
        this.disableActiveRouteChecking = false;
      }, 1000);
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
    label: 'Hello',
    route: 'hello',
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
    label: 'Gifts',
    route: 'gifts',
  },
  {
    label: 'Media',
    route: 'media',
  },
];
