import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriRecComponent } from './inscri-rec.component';

describe('InscriRecComponent', () => {
  let component: InscriRecComponent;
  let fixture: ComponentFixture<InscriRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriRecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
