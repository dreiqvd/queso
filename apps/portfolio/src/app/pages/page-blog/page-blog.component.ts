import { Component, computed, inject, Signal } from '@angular/core';

import { QsAnimationsDirective } from '@queso/common/directives';
import { QsIconComponent } from '@queso/ui-kit/icon';
import { QsPillComponent } from '@queso/ui-kit/pill';

import { ArticleCardComponent } from '../../components/article-card';
import { PageContainerComponent } from '../../components/page-container';
import { Article } from '../../interfaces';
import { ArticlesService } from '../../services';

@Component({
  selector: 'app-page-blog',
  standalone: true,
  imports: [
    QsAnimationsDirective,
    QsIconComponent,
    QsPillComponent,
    PageContainerComponent,
    ArticleCardComponent,
  ],
  templateUrl: './page-blog.component.html',
  providers: [ArticlesService],
})
export class PageBlogComponent {
  private readonly articlesService = inject(ArticlesService);
  readonly articles: Signal<Article[]> = computed(() =>
    this.articlesService.getArticles()
  );
}
