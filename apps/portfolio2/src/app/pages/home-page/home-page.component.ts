import { Component } from '@angular/core';

import { PageContainerComponent } from '../../components/page-container/page-container.component';

import { HomeExperienceComponent } from './home-experience/home-experience.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';

@Component({
  selector: 'app-home-page',
  imports: [PageContainerComponent, HomeHeroComponent, HomeExperienceComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
