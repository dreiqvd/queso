import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { Article } from '../../interfaces';

@Component({
  selector: 'qs-article-card',
  standalone: true,
  imports: [DatePipe, IconComponent, PillComponent],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent {
  readonly article = input.required<Article>();
  readonly showImage = input(true);
}
