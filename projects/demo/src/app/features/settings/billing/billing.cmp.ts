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
import { BillingDataService } from '../../../core/data-access/billing.service';
import { PaymentProfileCmp } from '../ui/payment-profile/payment-profile.cmp';
import { PaymentProfile } from '../../../../../../../functions/src/models/models';
import { CaptureButton } from '../../../../../../ngx-cardnet/src/public-api';

@Component({
  selector: 'billing-settings',
  standalone: true,
  imports: [PaymentProfileCmp, CaptureButton],
  template: `
    <div class="mt-4 d-flex justify-content-between align-items-center">
      <div>
        <h4>Payment Methods</h4>
        <p class="d-none d-md-block">
          Add, deactivate or remove your cards at will.
        </p>
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
    <div class="" id="card-list">
      @defer (when profiles()) {
      <!---->
      @for (profile of profiles(); track $index) {
      <div class="py-2 px-1 px-md-4">
        <payment-profile
          [data]="profile"
          (delete)="deletePaymentProfile(profile)"
        />
      </div>
      }
      <!---->
      } @placeholder (minimum 1000ms) {
      <div class="text-center" style=" padding: 2em">
        <p class="fs-2 text-body-secondary">Loading</p>
        <div
          class="spinner-border"
          style="width: 3rem; height: 3rem;"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      }
    </div>
  `,
  styles: `.card-brand { height: 1em; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingSettingsCmp {
  @ViewChild('deleteDialog') deleteDialog?: ElementRef<HTMLDialogElement>;

  readonly data = inject(BillingDataService);

  readonly cardnetUser = toSignal(this.data.cardnetCustomerData$);

  readonly selectedProfile = signal<PaymentProfile | null>(null);

  readonly profiles = computed(
    () => this.cardnetUser()?.payload.PaymentProfiles
  );
  readonly cuid = computed(() => this.cardnetUser()?.payload.UniqueID);

  deletePaymentProfile(profile: PaymentProfile) {
    this.data.deletePaymentProfile$.next(profile.PaymentProfileId);
  }

  refreshProfiles() {
    this.data.refresh$.next();
  }
}
