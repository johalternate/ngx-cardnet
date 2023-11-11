import { TestBed } from '@angular/core/testing';

import { BillingDataService } from './billing.service';

describe('BillingService', () => {
  let service: BillingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
