import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCandidatComponent } from './info-candidat.component';

describe('InfoCandidatComponent', () => {
  let component: InfoCandidatComponent;
  let fixture: ComponentFixture<InfoCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
