import { TestBed } from '@angular/core/testing';

import { ServerInterceptorService } from './server-interceptor.service';

describe('ServerInterceptorService', () => {
  let service: ServerInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
