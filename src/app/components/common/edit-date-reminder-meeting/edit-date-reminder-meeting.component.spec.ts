import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDateReminderMeetingComponent } from './edit-date-reminder-meeting.component';

describe('EditDateReminderMeetingComponent', () => {
  let component: EditDateReminderMeetingComponent;
  let fixture: ComponentFixture<EditDateReminderMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDateReminderMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDateReminderMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
