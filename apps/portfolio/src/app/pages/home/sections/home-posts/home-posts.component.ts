import { AfterViewInit, Component, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import {
  AnimationsDirective,
  BREAKPOINTS,
  PlatformService,
} from '@queso/common';
import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';
import { getViewportHeight, getViewportWidth } from '@queso/utils';

@Component({
  selector: 'qs-home-posts',
  standalone: true,
  imports: [MatTooltip, IconComponent, PillComponent, AnimationsDirective],
  templateUrl: './home-posts.component.html',
  styleUrl: './home-posts.component.scss',
})
export class HomePostsComponent implements AfterViewInit {
  readonly posts = [
    {
      title: 'AI Utility Tools For Your Web Project',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tag: 'listicle',
      date: 'Feb. 02, 2024',
    },
    {
      title: "GitHub CoPilot: Why It's Worth the Pay",
      excerpt:
        'Maecenas vulputate, eros vitae gravida pellentesque, turpis ipsum.',
      tag: 'tech',
      date: 'Oct. 16, 2023',
    },
    {
      title: 'My Bookmarks as a Web Developer',
      excerpt:
        'Cras ultricies hendrerit vehicula. Fusce nulla lacus, laoreet vel.',
      tag: 'listicle',
      date: 'Sep. 24, 2023',
    },
  ];

  /** Determines whether to show link for the blogs page */
  showBlogsLink = true;

  constructor(private platformService: PlatformService) {}

  ngAfterViewInit(): void {
    if (this.platformService.isUsingBrowser()) {
      // Only show blogs link if viewport height is greater than or equal to 900px
      setTimeout(() => this.checkBlogsLinkVisibility());
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.checkBlogsLinkVisibility();
  }

  private checkBlogsLinkVisibility(): void {
    const height = getViewportHeight();
    this.showBlogsLink =
      getViewportWidth() <= BREAKPOINTS.DESKTOP_SM ||
      height >= 920 ||
      height <= BREAKPOINTS.SM_HEIGHT;
  }
}
