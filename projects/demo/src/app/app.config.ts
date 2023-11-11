import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

const firebase = {
  app: provideFirebaseApp(() => initializeApp(environment.firebase)),
  functions: provideFunctions(() => {
    const functions = getFunctions();
    if (!environment.production) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
  }),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(firebase.app, firebase.functions),
  ],
};
