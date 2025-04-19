import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilProComponent } from './profil-pro.component';

describe('ProfilProComponent', () => {
  let component: ProfilProComponent;
  let fixture: ComponentFixture<ProfilProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
