import { TestBed } from '@angular/core/testing';

import { RechercheOffreService } from './recherche-offre.service';

describe('RechercheOffreService', () => {
  let service: RechercheOffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechercheOffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
