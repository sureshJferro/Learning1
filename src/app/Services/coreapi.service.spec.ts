import { TestBed } from '@angular/core/testing';

import { CoreapiService } from './coreapi.service';

describe('CoreapiService', () => {
  let service: CoreapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
