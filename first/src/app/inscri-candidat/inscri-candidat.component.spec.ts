import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriCandidatComponent } from './inscri-candidat.component';

describe('InscriCandidatComponent', () => {
  let component: InscriCandidatComponent;
  let fixture: ComponentFixture<InscriCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
