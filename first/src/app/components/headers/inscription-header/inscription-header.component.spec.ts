import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionHeaderComponent } from './inscription-header.component';

describe('InscriptionHeaderComponent', () => {
  let component: InscriptionHeaderComponent;
  let fixture: ComponentFixture<InscriptionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
