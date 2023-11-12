import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebase } from './fire.config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebase()],
};
