import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

@Component({
  selector: 'qs-home-posts',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatTooltip,
    IconComponent,
    PillComponent,
    AnimationsDirective,
  ],
  templateUrl: './home-posts.component.html',
  styles: `
    .btn:hover {
      --text-default-color: white; // make the text white on hover
    }
  `,
})
export class HomePostsComponent {
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
}
