import { TestBed } from '@angular/core/testing';

import { FlatResolverService } from './flat-resolver.service';

describe('FlatResolverService', () => {
  let service: FlatResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlatResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
