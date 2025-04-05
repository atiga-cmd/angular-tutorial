import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresHeaderComponent } from './offres-header.component';

describe('OffresHeaderComponent', () => {
  let component: OffresHeaderComponent;
  let fixture: ComponentFixture<OffresHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffresHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
