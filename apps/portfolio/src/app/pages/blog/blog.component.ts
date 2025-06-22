import { Component, computed, inject, Signal } from '@angular/core';

import { QsAnimations } from '@queso/common/animations';

import { ArticleCard } from '../../components/article-card';
import { PageContainer } from '../../components/page-container';
import { Article } from '../../interfaces';
import { ArticlesService } from '../../services';

@Component({
  selector: 'app-blog',
  imports: [QsAnimations, PageContainer, ArticleCard],
  templateUrl: './blog.component.html',
  providers: [ArticlesService],
})
export class BlogPage {
  private readonly articlesService = inject(ArticlesService);
  readonly articles: Signal<Article[]> = computed(() =>
    this.articlesService.getArticles()
  );
}
