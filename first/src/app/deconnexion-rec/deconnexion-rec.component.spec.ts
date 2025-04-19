import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconnexionRecComponent } from './deconnexion-rec.component';

describe('DeconnexionRecComponent', () => {
  let component: DeconnexionRecComponent;
  let fixture: ComponentFixture<DeconnexionRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeconnexionRecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeconnexionRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
