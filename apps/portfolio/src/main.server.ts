import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (): Promise<ApplicationRef> =>
  bootstrapApplication(App, config);

export default bootstrap;
