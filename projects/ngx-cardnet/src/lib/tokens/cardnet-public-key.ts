import { InjectionToken } from '@angular/core';

export const CARDNET_PUBLIC_KEY = new InjectionToken<string>(
  'CardNET Public Account Key',
  { factory: () => 'mfH9CqiAFjFQh_gQR_1TQG_I56ONV7HQ' }
);
