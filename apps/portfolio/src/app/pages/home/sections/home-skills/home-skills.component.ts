import { Component } from '@angular/core';
import anime from 'animejs';

import { AnimationsDirective } from '@queso/common';
import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-home-skills',
  standalone: true,
  imports: [IconComponent, AnimationsDirective],
  templateUrl: './home-skills.component.html',
  styleUrl: './home-skills.component.scss',
})
export class HomeSkillsComponent {
  readonly coreSkills = [
    { logo: 'angular', name: 'Angular' },
    { logo: 'node', name: 'Node.js' },
  ];
  readonly otherTools = [
    {
      key: 'FRONTEND',
      items: ['react', 'tailwind', 'rxjs', 'ngrx', 'cypress', 'typescript'],
    },
    {
      key: 'BACKEND',
      items: ['python', 'postgres', 'mongodb', 'graphql'],
    },
    {
      key: 'OTHERS',
      items: ['google-maps', 'gcloud', 'docker', 'firebase', 'nx'],
    },
  ];

  rotateElement(target: string, value: number): void {
    anime.remove(target);
    anime({
      targets: target,
      rotate: {
        value,
        duration: 1500,
        easing: 'easeInOutSine',
      },
    });
  }
}
