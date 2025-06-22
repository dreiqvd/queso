import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import anime from 'animejs';

import { QsAnimations } from '@queso/common/animations';
import { QsIcon } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-landing-skills',
  imports: [MatTooltip, QsIcon, QsAnimations],
  templateUrl: './landing-skills.component.html',
})
export class LandingSkillsComponent {
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
    // eslint-disable-next-line import/no-named-as-default-member
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
