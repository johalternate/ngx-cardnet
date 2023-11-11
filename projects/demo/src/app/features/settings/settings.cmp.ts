import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsNavCmp } from './ui/nav/nav.cmp';
import { BillingSettingsCmp } from './billing/billing.cmp';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SettingsNavCmp, BillingSettingsCmp, RouterOutlet],
  template: `
    <section class="my-4">
      <h3>Settings</h3>
      <p>Manage your preferences here.</p>
      <hr />
      <div class="row">
        <aside class="col-4"><settings-nav /></aside>
        <main class="col-8"><router-outlet /></main>
      </div>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsCmp {}
