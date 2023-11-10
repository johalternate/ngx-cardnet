import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutProperties,
  CaptureButton,
} from '../../../ngx-cardnet/src/public-api';
import { FormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [CaptureButton, FormsModule],
  template: `
    <h1>CardNET en Angular</h1>
    <form>
      <div>
        <label for="uuid">Customer Unique ID</label>
        <input
          id="uuid"
          name="uuid"
          type="text"
          [(ngModel)]="cuid"
          style="width: 100%;"
        />
      </div>
      <button cardnet-capture [properties]="config" [cuid]="cuid">
        Capture Data
      </button>
    </form>
  `,
})
export class AppComponent {
  config: CheckoutProperties = {
    name: 'Mi tienda',
    email: 'cliente@gmail.com',
    image: 'https://mitienda.com/images/logocheckout.png',
    button_label: 'Pagar #monto#',
    description: 'Checkout de Mi tienda',
    currency: 'DOP',
    amount: '1.00',
    lang: 'ESP',
    form_id: 'commerce_form',
    checkout_card: '1',
    autoSubmit: 'false',
  };
  cuid = `UI_8865c16f-7331-4bc7-ae50-67e142f47fbe`;
}
