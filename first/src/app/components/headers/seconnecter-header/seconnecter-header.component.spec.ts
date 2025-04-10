import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeconnecterHeaderComponent } from './seconnecter-header.component';

describe('SeconnecterHeaderComponent', () => {
  let component: SeconnecterHeaderComponent;
  let fixture: ComponentFixture<SeconnecterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeconnecterHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeconnecterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
