import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import anime from 'animejs';

import { AnimationsDirective } from '@queso/common';
import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-home-skills',
  standalone: true,
  imports: [MatTooltip, IconComponent, AnimationsDirective],
  templateUrl: './home-skills.component.html',
  styleUrl: './home-skills.component.scss',
})
export class HomeSkillsComponent {
  readonly coreSkills = [
    {
      logo: 'angular',
      name: 'Angular',
      tooltip: 'One component at a time',
    },
    {
      logo: 'node',
      name: 'Node.js',
      tooltip: 'One endpoint at a time',
    },
  ];
  readonly otherTools = [
    {
      key: 'FRONTEND',
      items: ['react', 'tailwind', 'rxjs', 'ngrx', 'cypress'],
      tooltip: "Making sure your web isn't just a wall of text.",
    },
    {
      key: 'BACKEND',
      items: ['python', 'postgres', 'mongodb', 'graphql'],
      tooltip: 'Ensuring the backstage is steady.',
    },
    {
      key: 'OTHERS',
      items: ['google-maps', 'docker', 'firebase', 'nx'],
      tooltip: 'A few more tools in my backpack.',
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
