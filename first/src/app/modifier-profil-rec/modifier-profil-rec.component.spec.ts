import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProfilRecComponent } from './modifier-profil-rec.component';

describe('ModifierProfilRecComponent', () => {
  let component: ModifierProfilRecComponent;
  let fixture: ComponentFixture<ModifierProfilRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierProfilRecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierProfilRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
