import { Component, Input, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Meeting } from 'src/app/models/meeting.model';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { DataThemeService } from 'src/app/services/common/data-theme.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';
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
  pmForMeeting: ProjectManager | null = null;

  constructor(
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    public readonly ngxSmartModalService: NgxSmartModalService,
    public readonly dataThemeService: DataThemeService,
    public readonly pmService: ProjectManagersService
  ) { }

  ngOnInit(): void {
    this.prospect = this.ngxSmartModalService.getModalData('edit-date').prospect
    this.reminder = this.ngxSmartModalService.getModalData('edit-date').reminder
    this.meeting = this.ngxSmartModalService.getModalData('edit-date').meeting
    this.date = undefined;
  }

  onClickChangeDate() {
    this.reminder && this.remindersService.update(this.reminder.id, {
      date: this.date ?? this.reminder.date
    });

    this.meeting && this.meetingsService.update(this.meeting.id, {
      date: this.date ?? this.meeting.date,
      pm: this.pmForMeeting ?? this.meeting.pm 
    });
    

    this.ngxSmartModalService.closeAll();
  }
}
