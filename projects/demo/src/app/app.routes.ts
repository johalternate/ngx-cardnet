import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings.cmp').then((m) => m.SettingsCmp),
    loadChildren: () =>
      import('./features/settings/settings.routes').then((m) => m.routes),
  },
];
