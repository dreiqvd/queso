import { Component, OnInit, signal, ViewChild } from '@angular/core';
import anime from 'animejs';

import {
  AnimationsDirective,
  CursorDirective,
  PlatformService,
} from '@queso/common';

import { NavbarComponent } from '../../components/navbar';

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
    NavbarComponent,
    HomeHeroComponent,
    HomeAboutComponent,
    HomeSkillsComponent,
    HomePostsComponent,
    HomeContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  /** Element reference for the introductory backdrop */
  @ViewChild('backdrop', { read: AnimationsDirective })
  backdrop!: AnimationsDirective;

  /** Determines if animated intro text should be visible */
  readonly introVisibility = signal('visible');

  /** Determines if main content should be visible */
  readonly isContentVisible = signal(false);

  constructor(private platformService: PlatformService) {}

  ngOnInit(): void {
    if (this.platformService.isUsingBrowser()) {
      const duration = 1500;
      anime({
        targets: '#backdrop-svg-wrapper path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration,
        direction: 'alternate',
        delay: (_: HTMLElement, i: number) => i * 250,
        begin: () => this.introVisibility.set('visible'),
        complete: () => {
          this.backdrop.animate().then(() => {
            this.backdrop.removeElement();
            this.isContentVisible.set(true);
          });
        },
      });
    }
  }
}
