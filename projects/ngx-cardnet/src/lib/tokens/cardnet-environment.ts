import { InjectionToken } from '@angular/core';

export const CARDNET_ENVIRONMENT = new InjectionToken<string>(
  'CardNET Environment URL',
  { factory: () => 'https://lab.cardnet.com.do' }
);
