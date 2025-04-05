import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagescandComponent } from './messagescand.component';

describe('MessagescandComponent', () => {
  let component: MessagescandComponent;
  let fixture: ComponentFixture<MessagescandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagescandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagescandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
