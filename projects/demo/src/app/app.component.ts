import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AddCardCmp } from './add-card/add-card.component';
import { AddCustomerCmp } from './add-customer/add-customer.component';
import { HeaderCmp } from './components/header/header.cmp';
import { RouterOutlet } from '@angular/router';
import { AppCheck, getToken } from '@angular/fire/app-check';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [AddCardCmp, AddCustomerCmp, HeaderCmp, RouterOutlet],
  template: `
    <app-header />
    <div class="container">
      <router-outlet />
      <!-- <h1 class="my-4">CardNET en Angular</h1>
      <add-customer />
      <add-card /> -->
    </div>
  `,
})
export class AppComponent {
  appCheck = inject(AppCheck);

  ngOnInit() {
    getToken(this.appCheck, true);
  }
}
