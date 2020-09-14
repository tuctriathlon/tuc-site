import { TestBed } from '@angular/core/testing';

import { ParametresSiteService } from './parametres-site.service';

describe('ParametresSiteService', () => {
  let service: ParametresSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametresSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
