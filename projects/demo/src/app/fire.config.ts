import { importProvidersFrom } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  ReCaptchaV3Provider,
  initializeAppCheck,
  provideAppCheck,
} from '@angular/fire/app-check';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import { environment } from '../environments/environment';

const app = provideFirebaseApp(() => initializeApp(environment.firebase));

const functions = provideFunctions(() => {
  const functions = getFunctions();
  if (!environment.production) {
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }
  return functions;
});

const appCheck = provideAppCheck(() => {
  const appCheck = initializeAppCheck(getApp(), {
    provider: new ReCaptchaV3Provider(environment.reCaptcha.v3.siteKey),
  });
  return appCheck;
});

export const provideFirebase = () => {
  return importProvidersFrom(app, functions, appCheck);
};
