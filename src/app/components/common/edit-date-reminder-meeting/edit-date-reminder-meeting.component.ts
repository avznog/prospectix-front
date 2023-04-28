import { Component, Input, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-edit-date-reminder-meeting',
  templateUrl: './edit-date-reminder-meeting.component.html',
  styleUrls: ['./edit-date-reminder-meeting.component.scss']
})
export class EditDateReminderMeetingComponent implements OnInit {

  @Input() reminder!: Reminder;
  @Input() meeting!: Meeting;
  @Input() prospect!: Prospect;

  date: Date | undefined = undefined;

  constructor(
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.prospect = this.ngxSmartModalService.getModalData('edit-date').prospect
    this.reminder = this.ngxSmartModalService.getModalData('edit-date').reminder
    this.meeting = this.ngxSmartModalService.getModalData('edit-date').meeting
    this.date = undefined;
  }

  onClickChangeDate() {
    this.reminder && this.remindersService.update(this.reminder.id, {
      date: new Date(this.date!)
    });

    this.meeting && this.meetingsService.update(this.meeting.id, {
      date: new Date(this.date!)
    });

    this.ngxSmartModalService.closeAll();
  }
}
