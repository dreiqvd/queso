import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';

import { PageTitleStrategy } from '@queso/utils/strategies';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy,
    },
  ],
};
