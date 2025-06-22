import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { QsIcon } from '@queso/ui-kit/icon';
import { QsPill } from '@queso/ui-kit/pill';

import { Article } from '../../interfaces';

@Component({
  selector: 'app-article-card',
  imports: [DatePipe, QsIcon, QsPill],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent {
  readonly article = input.required<Article>();
  readonly showImage = input(true);
}
