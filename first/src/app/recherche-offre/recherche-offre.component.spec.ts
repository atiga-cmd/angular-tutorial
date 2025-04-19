import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheOffreComponent } from './recherche-offre.component';

describe('RechercheOffreComponent', () => {
  let component: RechercheOffreComponent;
  let fixture: ComponentFixture<RechercheOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheOffreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
