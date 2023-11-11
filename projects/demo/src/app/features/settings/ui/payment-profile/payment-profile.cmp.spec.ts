import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProfileCmp } from './payment-profile.cmp';

describe('PaymentMethodCmp', () => {
  let component: PaymentProfileCmp;
  let fixture: ComponentFixture<PaymentProfileCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentProfileCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentProfileCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
