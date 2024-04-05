import { NgOptimizedImage } from '@angular/common';
import { Component, computed } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { ArticlesService } from '../../../../services';
import { ArticleCardComponent } from '../../../../shared/article-card';

@Component({
  selector: 'qs-home-posts',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    MatTooltip,
    IconComponent,
    PillComponent,
    AnimationsDirective,
    ArticleCardComponent,
  ],
  providers: [ArticlesService],
  templateUrl: './home-posts.component.html',
  styles: `
    .btn:hover {
      --text-default-color: white; // make the text white on hover
    }
  `,
})
export class HomePostsComponent {
  constructor(private articlesService: ArticlesService) {}
  readonly posts = computed(() => this.articlesService.getArticles());
}
