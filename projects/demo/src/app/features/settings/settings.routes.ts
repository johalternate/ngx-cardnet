import { Routes } from '@angular/router';
import { BillingSettingsCmp } from './billing/billing.cmp';

export const routes: Routes = [
  { path: '', redirectTo: 'billing', pathMatch: 'full' },
  { path: 'billing', component: BillingSettingsCmp },
];
