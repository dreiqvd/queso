import {
  afterNextRender,
  AfterRenderPhase,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import anime from 'animejs';

import {
  QsAnimationsDirective,
  QsCursorDirective,
} from '@queso/common/directives';

import { PageContainerComponent } from '../../components/page-container';

import { LandingAboutComponent } from './sections/landing-about/landing-about.component';
import { LandingContactComponent } from './sections/landing-contact/landing-contact.component';
import { LandingHeroComponent } from './sections/landing-hero/landing-hero.component';
import { LandingPostsComponent } from './sections/landing-posts/landing-posts.component';
import { LandingSkillsComponent } from './sections/landing-skills/landing-skills.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    QsAnimationsDirective,
    QsCursorDirective,
    PageContainerComponent,
    LandingHeroComponent,
    LandingAboutComponent,
    LandingSkillsComponent,
    LandingPostsComponent,
    LandingContactComponent,
  ],
  templateUrl: './landing-page.component.html',
  styles: `
    .backdrop {
      background-color: var(--color-accent);
      z-index: var(--z-fixed);
    }

    #backdrop-svg-wrapper {
      visibility: hidden;
    }
  `,
})
export class LandingPageComponent {
  /** Element reference for the introductory backdrop */
  @ViewChild('backdrop', { read: QsAnimationsDirective })
  backdrop!: QsAnimationsDirective;

  @ViewChild('contact')
  contactSection!: ElementRef<HTMLElement>;

  @ViewChild('about')
  aboutSection!: ElementRef<HTMLElement>;

  /** Determines if animated intro text should be visible */
  readonly introVisibility = signal('hidden');

  /** Determines if main content should be visible */
  readonly isContentVisible = signal(false);

  constructor() {
    afterNextRender(
      () => {
        this.introVisibility.set('visible');
        anime({
          targets: '#backdrop-svg-wrapper path',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1500,
          direction: 'alternate',
          delay: (_: HTMLElement, i: number) => i * 250,
        }).finished.then(() => {
          this.backdrop.animate().then(() => {
            this.backdrop.removeElement();
            this.isContentVisible.set(true);
          });
        });
      },
      { phase: AfterRenderPhase.Read }
    );
  }
}
