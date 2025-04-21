import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconnexionAdminComponent } from './deconnexion-admin.component';

describe('DeconnexionAdminComponent', () => {
  let component: DeconnexionAdminComponent;
  let fixture: ComponentFixture<DeconnexionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeconnexionAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeconnexionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
