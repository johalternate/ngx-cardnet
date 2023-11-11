import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Customer } from '../../../../../../functions/src/models';
import { AuthService } from './auth.service';
import {
  BehaviorSubject,
  Subject,
  combineLatestWith,
  concatMap,
  defer,
  exhaustMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class BillingDataService {
  private readonly auth = inject(AuthService);
  private readonly functions = inject(Functions);

  readonly delete$ = new Subject<number>();
  readonly refresh$ = new BehaviorSubject<void>(void 0);

  cardnetCustomerData$ = this.auth.user$.pipe(
    map((user) => user.cardnet.customerId),
    combineLatestWith(this.refresh$),
    switchMap(([cid]) => this.getCustomerData(cid)),
    map((response) => response.data)
  );

  cardnetUserDataErrors$ = this.cardnetCustomerData$.pipe(
    map((data) => data.errors)
  );

  paymentProfiles$ = this.cardnetCustomerData$.pipe(
    map((data) => data.payload.PaymentProfiles)
  );

  constructor() {
    /**
     * Delete Stream
     */
    this.delete$
      .pipe(
        takeUntilDestroyed(),
        withLatestFrom(this.auth.user$),
        concatMap(([profileId, customer]) =>
          this.deletePaymentProfile(customer.cardnet.customerId, profileId)
        )
      )
      .subscribe({
        next: () => this.refresh$.next(),
        error: (err) => console.log(err),
      });
  }

  readonly getCustomerData = httpsCallable<
    number,
    { payload: Customer; errors: unknown[] }
  >(this.functions, 'getCustomer');

  deletePaymentProfile(customerId: number, profileId: number) {
    const deleteFn = httpsCallable<
      { customerId: number; profileId: number },
      { payload: Customer; errors: unknown[] }
    >(this.functions, 'deletePaymentProfile');

    return defer(() => deleteFn({ customerId, profileId }));
  }
}
