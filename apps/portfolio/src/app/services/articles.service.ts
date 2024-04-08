import { Injectable } from '@angular/core';

import { Article } from '../interfaces';

@Injectable()
export class ArticlesService {
  getArticles(): Article[] {
    return [
      {
        title: 'Online Utility Resources for Frontend Development',
        excerpt:
          'Stuck on an animation? Need a quick code snippet? These are my go-to bookmarks for some frontend needs.',
        date: '2024-03-26',
        tags: ['LISTICLE'],
        image: 'gakeoq.jpg',
        imageAlt: 'Collection of frontend needs',
        url: 'https://dreiqvd.medium.com/online-utility-resources-for-frontend-development-fe3b109cf80d',
      },
      {
        title: "GitHub CoPilot: Why It's Worth the Pay",
        excerpt:
          "Not a paid ad, but here are some reasons how GitHub's AI programming companion stepped up my coding experience.",
        date: '2024-03-28',
        tags: ['TECH'],
        image: 'zybxmv.jpg',
        imageAlt: 'GitHub CoPilot logo',
        url: 'https://dreiqvd.medium.com/github-copilot-why-its-worth-the-pay-ee2e1efcd3ec',
      },
      {
        title: 'Exploring Angular 17: Takeaways on Some Major Changes',
        excerpt:
          "Sharing insights from my hands-on experience with Angular's big changes.",
        date: '2024-03-28',
        tags: ['TECH'],
        image: 'aynuzn.jpg',
        imageAlt: 'Angular Logo',
        url: 'https://dreiqvd.medium.com/exploring-angular-17-takeaways-on-some-major-changes-0254eea15e1b',
      },
    ];
  }
}
