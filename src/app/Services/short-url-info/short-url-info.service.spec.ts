import { TestBed } from '@angular/core/testing';

import { ShortUrlInfoService } from './short-url-info.service';

describe('ShortUrlInfoService', () => {
  let service: ShortUrlInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortUrlInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
