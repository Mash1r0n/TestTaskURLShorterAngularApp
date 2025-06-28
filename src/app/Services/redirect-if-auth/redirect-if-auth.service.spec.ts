import { TestBed } from '@angular/core/testing';

import { RedirectIfAuthService } from './redirect-if-auth.service';

describe('RedirectIfAuthService', () => {
  let service: RedirectIfAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectIfAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
