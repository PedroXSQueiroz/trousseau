import { TestBed } from '@angular/core/testing';

import { FlatService } from './flat-service.service';

describe('FlatServiceService', () => {
  let service: FlatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
