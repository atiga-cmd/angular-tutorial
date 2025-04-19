import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesCandidatureComponent } from './les-candidature.component';

describe('LesCandidatureComponent', () => {
  let component: LesCandidatureComponent;
  let fixture: ComponentFixture<LesCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
