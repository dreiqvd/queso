import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { QsAnimations } from '@queso/common/animations';

import { ArticleCard } from '../../../../components/article-card';
import { ArticlesService } from '../../../../services';

@Component({
  selector: 'app-landing-posts',
  imports: [
    RouterLink,
    NgOptimizedImage,
    MatTooltip,
    QsAnimations,
    ArticleCard,
  ],
  providers: [ArticlesService],
  templateUrl: './landing-posts.component.html',
  styles: `
    .btn:hover {
      --text-default-color: white; // make the text white on hover
    }
  `,
})
export class LandingPosts {
  private readonly articlesService = inject(ArticlesService);
  readonly posts = computed(() => this.articlesService.getArticles());
}
