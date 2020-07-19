import { TestBed } from '@angular/core/testing';

import { TrousseauByIdResolverService } from './trousseau-by-id-resolver.service';

describe('TrousseauByIdResolverService', () => {
  let service: TrousseauByIdResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrousseauByIdResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
