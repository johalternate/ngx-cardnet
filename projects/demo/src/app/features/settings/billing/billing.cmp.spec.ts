import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSettingsCmp } from './billing.cmp';

describe('BillingCmp', () => {
  let component: BillingSettingsCmp;
  let fixture: ComponentFixture<BillingSettingsCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingSettingsCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingSettingsCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
