import { TestBed } from '@angular/core/testing';

import { FaqInfoService } from './faq-info.service';

describe('FaqInfoService', () => {
  let service: FaqInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
