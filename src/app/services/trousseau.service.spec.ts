import { TestBed } from '@angular/core/testing';

import { TrousseauService } from './trousseau.service';

describe('TrousseauService', () => {
  let service: TrousseauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrousseauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
