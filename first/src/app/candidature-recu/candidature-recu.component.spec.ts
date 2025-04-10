import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureRECUComponent } from './candidature-recu.component';

describe('CandidatureRECUComponent', () => {
  let component: CandidatureRECUComponent;
  let fixture: ComponentFixture<CandidatureRECUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatureRECUComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatureRECUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
