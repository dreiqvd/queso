import { Component } from '@angular/core';

import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-home-skills',
  standalone: true,
  imports: [IconComponent],
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
}
