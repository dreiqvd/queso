import { Component, computed, inject, Signal } from '@angular/core';

import { QsAnimationsDirective } from '@queso/common/animations';

import { ArticleCardComponent } from '../../components/article-card';
import { PageContainerComponent } from '../../components/page-container';
import { Article } from '../../interfaces';
import { ArticlesService } from '../../services';

@Component({
  selector: 'app-blog',
  imports: [
    QsAnimationsDirective,
    PageContainerComponent,
    ArticleCardComponent,
  ],
  templateUrl: './blog.component.html',
  providers: [ArticlesService],
})
export class BlogComponent {
  private readonly articlesService = inject(ArticlesService);
  readonly articles: Signal<Article[]> = computed(() =>
    this.articlesService.getArticles()
  );
}
