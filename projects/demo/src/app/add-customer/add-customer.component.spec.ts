import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerCmp } from './add-customer.component';

describe('AddCustomerComponent', () => {
  let component: AddCustomerCmp;
  let fixture: ComponentFixture<AddCustomerCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCustomerCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
