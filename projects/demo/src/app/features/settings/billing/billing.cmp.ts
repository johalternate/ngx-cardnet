import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BillingDataService } from '../../../core/data-access/billing.service';
import { PaymentProfileCmp } from '../ui/payment-profile/payment-profile.cmp';
import { PaymentProfile } from '../../../../../../../functions/src/models';
import { CaptureButton } from '../../../../../../ngx-cardnet/src/public-api';

@Component({
  selector: 'billing-settings',
  standalone: true,
  imports: [CommonModule, PaymentProfileCmp, CaptureButton],
  template: `
    <div class="mt-4 d-flex justify-content-between align-items-center">
      <div>
        <h4>Payment Methods</h4>
        <p>Add, deactivate or remove your cards at will.</p>
      </div>
      <div>
        <button
          cardnet-capture
          [cuid]="cuid() || ''"
          [properties]="{ form_id: 'formm', image: '', autoSubmit: 'false' }"
          (token)="refreshProfiles()"
          [disabled]="cuid() == ''"
          class="btn btn-dark"
        >
          Add Card
        </button>
      </div>
    </div>
    <hr />
    <div class="accordion accordion-flush" id="card-list">
      @defer (when profiles()) { @for (profile of profiles(); track $index) {
      <div class="p-4">
        <payment-profile
          [data]="profile"
          (delete)="deletePaymentProfile(profile)"
        />
      </div>
      } } @placeholder (minimum 5000ms) {
      <h1>LOADING</h1>
      }
    </div>
  `,
  styles: `.card-brand { height: 1em; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingSettingsCmp {
  @ViewChild('deleteDialog') deleteDialog?: ElementRef<HTMLDialogElement>;

  data = inject(BillingDataService);

  cardnetUser = toSignal(this.data.cardnetCustomerData$);

  selectedProfile = signal<PaymentProfile | null>(null);

  profiles = computed(() => this.cardnetUser()?.payload.PaymentProfiles);
  cuid = computed(() => this.cardnetUser()?.payload.UniqueID);

  deletePaymentProfile(profile: PaymentProfile) {
    this.data.delete$.next(profile.PaymentProfileId);
  }

  refreshProfiles() {
    this.data.refresh$.next();
  }
}
