import { TestBed } from '@angular/core/testing';

import { CardnetService } from './cardnet.service';

describe('NgxCardnetService', () => {
  let service: CardnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
