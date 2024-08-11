import { TestBed } from '@angular/core/testing';

import { TheatreServiceService } from './theatre-service.service';

describe('TheatreServiceService', () => {
  let service: TheatreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheatreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
