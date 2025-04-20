import { Component } from '@angular/core';

import { HomeExperienceComponent } from './home-experience/home-experience.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';

@Component({
  selector: 'app-home-page',
  imports: [HomeHeroComponent, HomeExperienceComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
