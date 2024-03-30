import { Injectable } from '@angular/core';

import { Article } from '../interfaces';

@Injectable()
export class ArticlesService {
  getArticles(): Article[] {
    return [
      {
        title: 'Online Utility Resources for Frontend Development',
        excerpt:
          'Asset generators? Animations? Code snippets? Here are some of my go-to bookmarks for some common frontend tasks.',
        date: '2024-03-26',
        tags: ['listicle'],
        image: 'gakeoq.jpg',
        imageAlt: '',
        url: '',
      },
      {
        title: "GitHub CoPilot: Why It's Worth the Pay",
        excerpt:
          "Not a paid ad, but here are some reasons how GitHub's AI programming companion stepped up my coding experience.",
        date: '2024-03-28',
        tags: ['tech'],
        image: 'zybxmv.jpg',
        imageAlt: '',
        url: '',
      },
      {
        title: 'Exploring Angular 17: Takeaways on Some Major Changes',
        excerpt:
          "Sharing insights from my hands-on experience with Angular's big changes. ",
        date: '2024-03-28',
        tags: ['tech'],
        image: 'aynuzn.jpg',
        imageAlt: '',
        url: '',
      },
    ];
  }
}
