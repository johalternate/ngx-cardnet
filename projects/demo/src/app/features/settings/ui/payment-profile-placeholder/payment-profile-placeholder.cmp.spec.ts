import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProfilePlaceholderCmp } from './payment-profile-placeholder.cmp';

describe('PaymentMethodCmp', () => {
  let component: PaymentProfilePlaceholderCmp;
  let fixture: ComponentFixture<PaymentProfilePlaceholderCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentProfilePlaceholderCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentProfilePlaceholderCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
