import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacterCandidatComponent } from './contacter-candidat.component';

describe('ContacterCandidatComponent', () => {
  let component: ContacterCandidatComponent;
  let fixture: ComponentFixture<ContacterCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContacterCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContacterCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
