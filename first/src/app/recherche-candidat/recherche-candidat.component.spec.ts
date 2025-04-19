import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheCandidatComponent } from './recherche-candidat.component';

describe('RechercheCandidatComponent', () => {
  let component: RechercheCandidatComponent;
  let fixture: ComponentFixture<RechercheCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
