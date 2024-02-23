import { Component } from '@angular/core';

@Component({
  selector: 'qs-home-skills',
  standalone: true,
  imports: [],
  templateUrl: './home-skills.component.html',
  styleUrl: './home-skills.component.scss',
})
export class HomeSkillsComponent {
  readonly coreSkills = [
    { logo: 'angular', name: 'Angular' },
    { logo: 'node', name: 'Node.js' },
  ];
}
