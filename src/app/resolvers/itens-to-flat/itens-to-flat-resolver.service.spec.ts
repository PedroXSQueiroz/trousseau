import { TestBed } from '@angular/core/testing';

import { ItensToFlatResolverService } from './itens-to-flat-resolver.service';

describe('ItensToFlatResolverService', () => {
  let service: ItensToFlatResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItensToFlatResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
