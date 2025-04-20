import { Component } from '@angular/core';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [],
  templateUrl: './home-hero.component.html',
  styles: `
    .subheading {
      .highlight-text {
        line-height: 40px;

        &:first-child {
          &::before {
            background-color: #4da6a9;
          }
        }

        &:nth-of-type(2) {
          &::before {
            background-color: #e77272;
          }
        }
      }
    }
  `,
})
export class HomeHeroComponent {}
