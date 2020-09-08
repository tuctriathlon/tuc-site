import { TestBed } from '@angular/core/testing';

import { ParametreInscritpionService } from './parametre-inscritpion.service';

describe('ParametreInscritpionService', () => {
  let service: ParametreInscritpionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametreInscritpionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
