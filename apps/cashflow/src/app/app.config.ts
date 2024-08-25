import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  FirebaseApp,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCzmF8uTEEOKMQj9nz70sdqdTQ_Bzo6xsQ',
        authDomain: 'dreiq-cashflow.firebaseapp.com',
        projectId: 'dreiq-cashflow',
        storageBucket: 'dreiq-cashflow.appspot.com',
        messagingSenderId: '806329963591',
        appId: '1:806329963591:web:f9ab196ecd88d32bee0d62',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth(inject(FirebaseApp))),
  ],
};
