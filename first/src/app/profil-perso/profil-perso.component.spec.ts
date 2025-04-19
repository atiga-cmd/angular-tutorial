import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPersoComponent } from './profil-perso.component';

describe('ProfilPersoComponent', () => {
  let component: ProfilPersoComponent;
  let fixture: ComponentFixture<ProfilPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilPersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
