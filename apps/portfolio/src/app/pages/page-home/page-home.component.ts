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

import { HomeAboutComponent } from './sections/home-about/home-about.component';
import { HomeContactComponent } from './sections/home-contact/home-contact.component';
import { HomeHeroComponent } from './sections/home-hero/home-hero.component';
import { HomePostsComponent } from './sections/home-posts/home-posts.component';
import { HomeSkillsComponent } from './sections/home-skills/home-skills.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    QsAnimationsDirective,
    QsCursorDirective,
    PageContainerComponent,
    HomeHeroComponent,
    HomeAboutComponent,
    HomeSkillsComponent,
    HomePostsComponent,
    HomeContactComponent,
  ],
  templateUrl: './page-home.component.html',
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
export class PageHomeComponent {
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
