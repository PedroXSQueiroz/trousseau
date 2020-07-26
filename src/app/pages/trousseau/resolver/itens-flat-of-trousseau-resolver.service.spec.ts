import { TestBed } from '@angular/core/testing';

import { ItensFlatOfTrousseauResolverService } from './itens-flat-of-trousseau-resolver.service';

describe('ItensFlatOfTrousseauResolverService', () => {
  let service: ItensFlatOfTrousseauResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItensFlatOfTrousseauResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
