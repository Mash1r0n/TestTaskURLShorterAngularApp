import { TestBed } from '@angular/core/testing';

import { ShourtUrlService } from './shourt-url.service';

describe('ShourtUrlService', () => {
  let service: ShourtUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShourtUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
