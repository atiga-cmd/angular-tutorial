import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProComponent } from './info-pro.component';

describe('InfoProComponent', () => {
  let component: InfoProComponent;
  let fixture: ComponentFixture<InfoProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
