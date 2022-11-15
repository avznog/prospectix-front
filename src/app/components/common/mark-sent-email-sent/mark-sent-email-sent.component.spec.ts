import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkSentEmailSentComponent } from './mark-sent-email-sent.component';

describe('MarkSentEmailSentComponent', () => {
  let component: MarkSentEmailSentComponent;
  let fixture: ComponentFixture<MarkSentEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkSentEmailSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkSentEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
