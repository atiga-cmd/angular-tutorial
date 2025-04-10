import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifOffreComponent } from './modif-offre.component';

describe('ModifOffreComponent', () => {
  let component: ModifOffreComponent;
  let fixture: ComponentFixture<ModifOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifOffreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
