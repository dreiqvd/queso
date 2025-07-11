import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

import { NavigationService } from '../../components/navigation/navigation.service';

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
  styleUrl: './landing-page.scss',
})
export class LandingPage implements OnDestroy {
  @ViewChildren('section') sections!: QueryList<ElementRef<HTMLElement>>;

  private readonly navigationService = inject(NavigationService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly activeRoute = signal<string>('hello');
  protected readonly isMenuHidden = signal<boolean>(false);

  protected readonly navItems = NAV_ITEMS;
  private disableActiveRouteChecking = false;
  private menuIntersectionObs$?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      // Compute the active fragment when section is scrolled into view
      this.menuIntersectionObs$ = new IntersectionObserver(
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
        (this.menuIntersectionObs$ as IntersectionObserver).observe(
          section.nativeElement
        );
      });

      fromEvent(window, 'scroll')
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.handleScrollEvent();
        });
    });
  }

  private handleScrollEvent(): void {
    // Check color for main navigation menu button
    const hashtagSection = this.sections.get(4);
    const giftsSection = this.sections.get(5);

    if (!hashtagSection || !giftsSection) {
      return;
    }

    const hashtagRect = hashtagSection.nativeElement.getBoundingClientRect();
    const giftsRect = giftsSection.nativeElement.getBoundingClientRect();

    const threshold = 38;
    if (
      (hashtagRect.y < threshold && hashtagRect.bottom > threshold) ||
      (giftsRect.y < threshold && giftsRect.bottom > threshold)
    ) {
      this.navigationService.updateMenuBtnColor('var(--text-body-light)');
    } else {
      this.navigationService.updateMenuBtnColor('var(--color-primary)');
    }
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
    // Clean up observers
    if (this.menuIntersectionObs$) {
      this.menuIntersectionObs$.disconnect();
      this.menuIntersectionObs$ = undefined;
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
