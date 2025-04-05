import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRecComponent } from './profil-rec.component';

describe('ProfilRecComponent', () => {
  let component: ProfilRecComponent;
  let fixture: ComponentFixture<ProfilRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilRecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
