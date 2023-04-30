import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingAndReminderComponent } from './add-meeting-and-reminder.component';

describe('AddMeetingAndReminderComponent', () => {
  let component: AddMeetingAndReminderComponent;
  let fixture: ComponentFixture<AddMeetingAndReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetingAndReminderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeetingAndReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
