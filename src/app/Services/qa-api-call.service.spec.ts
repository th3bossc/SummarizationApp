import { TestBed } from '@angular/core/testing';

import { QaApiCallService } from './qa-api-call.service';

describe('QaApiCallService', () => {
  let service: QaApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QaApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
