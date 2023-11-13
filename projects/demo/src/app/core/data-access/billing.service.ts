import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Customer } from '../../../../../../functions/src/models/models';
import { AuthService } from './auth.service';
import {
  BehaviorSubject,
  Subject,
  combineLatestWith,
  exhaustMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface CustomerResponse {
  payload: Customer;
  errors: unknown[];
}

interface DeleteRequest {
  customerId: number;
  profileId: number;
}

@Injectable({
  providedIn: 'root',
})
export class BillingDataService {
  private readonly auth = inject(AuthService);
  private readonly functions = inject(Functions);

  readonly deletePaymentProfile$ = new Subject<number>();
  readonly refresh$ = new BehaviorSubject<void>(void 0);

  readonly error$ = new Subject<string>();

  readonly cardnetCustomerId$ = this.auth.user$.pipe(
    map((user) => user.cardnet.customerId)
  );

  readonly cardnetCustomerData$ = this.cardnetCustomerId$.pipe(
    combineLatestWith(this.refresh$),
    switchMap(([cid]) => this.getCustomerData(cid)),
    map((response) => response.data)
  );

  constructor() {
    /**
     * Delete Payment Profile Stream
     */
    this.deletePaymentProfile$
      .pipe(
        takeUntilDestroyed(),
        withLatestFrom(this.cardnetCustomerId$),
        exhaustMap(([profileId, customerId]) =>
          this.deletePaymentProfile({ customerId, profileId })
        )
      )
      .subscribe({
        next: (res) => {
          this.refresh$.next();
          console.log(res);
        },
        error: (err) => this.error$.next(err),
      });
    /**
     * Error Stream
     * TODO: Display errors in toasts
     */
    this.error$.pipe(takeUntilDestroyed()).subscribe((err) => console.log(err));
  }

  readonly getCustomerData = httpsCallable<number, CustomerResponse>(
    this.functions,
    'getCustomer'
  );

  readonly deletePaymentProfile = httpsCallable<
    DeleteRequest,
    CustomerResponse
  >(this.functions, 'deletePaymentProfile');
}
