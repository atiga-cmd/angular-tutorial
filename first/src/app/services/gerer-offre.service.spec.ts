import { TestBed } from '@angular/core/testing';

import { GererOffreService } from './gerer-offre.service';

describe('GererOffreService', () => {
  let service: GererOffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererOffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
