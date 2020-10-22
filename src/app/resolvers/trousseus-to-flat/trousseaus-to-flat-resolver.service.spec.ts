import { TestBed } from '@angular/core/testing';

import { TrousseausToFlatResolverService } from './trousseaus-to-flat-resolver.service';

describe('TrousseausToFlatResolverService', () => {
  let service: TrousseausToFlatResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrousseausToFlatResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
