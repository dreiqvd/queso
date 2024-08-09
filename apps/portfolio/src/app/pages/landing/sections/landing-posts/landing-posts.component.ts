import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { QsAnimationsDirective } from '@queso/common/animations';
import { QsIconComponent } from '@queso/ui-kit/icon';
import { QsPillComponent } from '@queso/ui-kit/pill';

import { ArticleCardComponent } from '../../../../components/article-card';
import { ArticlesService } from '../../../../services';

@Component({
  selector: 'app-landing-posts',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    MatTooltip,
    QsIconComponent,
    QsPillComponent,
    QsAnimationsDirective,
    ArticleCardComponent,
  ],
  providers: [ArticlesService],
  templateUrl: './landing-posts.component.html',
  styles: `
    .btn:hover {
      --text-default-color: white; // make the text white on hover
    }
  `,
})
export class LandingPostsComponent {
  private readonly articlesService = inject(ArticlesService);
  readonly posts = computed(() => this.articlesService.getArticles());
}
