import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLogoComponent } from './chat-logo.component';

describe('ChatLogoComponent', () => {
  let component: ChatLogoComponent;
  let fixture: ComponentFixture<ChatLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatLogoComponent]
    });
    fixture = TestBed.createComponent(ChatLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
