import { TestBed } from '@angular/core/testing';

import { AjoutOffreService } from './ajout-offre.service';

describe('AjoutOffreService', () => {
  let service: AjoutOffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutOffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
