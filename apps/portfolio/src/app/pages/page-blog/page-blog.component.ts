import { Component, computed, Signal } from '@angular/core';

import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { Article } from '../../interfaces';
import { ArticlesService } from '../../services';
import { ArticleCardComponent } from '../../shared/article-card';
import { PageContainerComponent } from '../../shared/page-container';

@Component({
  selector: 'qs-page-blog',
  standalone: true,
  imports: [
    PageContainerComponent,
    PillComponent,
    IconComponent,
    ArticleCardComponent,
  ],
  templateUrl: './page-blog.component.html',
  providers: [ArticlesService],
})
export class PageBlogComponent {
  constructor(private articlesService: ArticlesService) {}

  readonly articles: Signal<Article[]> = computed(() =>
    this.articlesService.getArticles()
  );
}
