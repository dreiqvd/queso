import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import anime from 'animejs';

import { AnimationsDirective, CursorDirective } from '@queso/common/directives';
import { PlatformService } from '@queso/common/services';

import { PageContainerComponent } from '../../shared/page-container';

import { HomeAboutComponent } from './sections/home-about/home-about.component';
import { HomeContactComponent } from './sections/home-contact/home-contact.component';
import { HomeHeroComponent } from './sections/home-hero/home-hero.component';
import { HomePostsComponent } from './sections/home-posts/home-posts.component';
import { HomeSkillsComponent } from './sections/home-skills/home-skills.component';

@Component({
  selector: 'qs-home',
  standalone: true,
  imports: [
    AnimationsDirective,
    CursorDirective,
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
  `,
})
export class PageHomeComponent implements OnInit {
  /** Element reference for the introductory backdrop */
  @ViewChild('backdrop', { read: AnimationsDirective })
  backdrop!: AnimationsDirective;
  @ViewChild('contact') contactSection!: ElementRef<HTMLElement>;
  @ViewChild('about') aboutSection!: ElementRef<HTMLElement>;

  /** Determines if animated intro text should be visible */
  readonly introVisibility = signal('visible');

  /** Determines if main content should be visible */
  readonly isContentVisible = signal(false);

  constructor(private platformService: PlatformService) {}

  ngOnInit(): void {
    if (this.platformService.isUsingBrowser()) {
      anime({
        targets: '#backdrop-svg-wrapper path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        direction: 'alternate',
        delay: (_: HTMLElement, i: number) => i * 250,
        begin: () => this.introVisibility.set('visible'),
      }).finished.then(() => {
        this.backdrop.animate().then(() => {
          this.backdrop.removeElement();
          this.isContentVisible.set(true);
        });
      });
    }
  }
}
