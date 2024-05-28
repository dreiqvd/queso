import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { SearchService } from './services/search.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    { provide: SearchService },
  ],
};
