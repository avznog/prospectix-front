import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { MeetingType } from 'src/app/constants/meeting.type';
import { StageType } from 'src/app/constants/stage.type';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-add-meetings-modal',
  templateUrl: './add-meetings-modal.component.html',
  styleUrls: ['./add-meetings-modal.component.scss']
})
export class AddMeetingsModalComponent implements OnInit {

  date!: Date;
  type: MeetingType = MeetingType.EXT;
  
  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];
  @Input() prospect!: Prospect;
  @Input() reminder!: Reminder;
  

  constructor(
    private readonly meetingsService: MeetingsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
    private readonly prospectsService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
  }

  onCreateMeeting() {
    this.prospect.stage == 2 && this.onMarkReminderDone();

    // count as a call
    (this.prospect.stage == 0 || this.prospect.stage == 1) && this.statisticsService.createCallForMe({
      prospect: this.prospect,
      date: new Date
    });

    // Incrementing the meetings count
    (this.prospect.stage == 0 || this.prospect.stage == 1) && this.statisticsService.createMeetingFroMe();

    this.prospectsService.updateByStage(this.prospect.id, { stage: StageType.MEETING });
    this.remindersService.updateByStage(this.prospect.id, { stage: StageType.MEETING });
    this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.MEETING });
    this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.MEETING });
    this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.MEETING });
    
    this.meetingsService.create({
      type: this.type,
      date: this.date,
      done: false,
      prospect: this.prospect,
      creationDate: new Date
    });

    this.eventsService.create({
      type: EventType.ADD_MEETING,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.ADD_MEETING} ${this.authService.currentUserSubject.getValue().pseudo}`
    });

    
    
  }

  onMarkReminderDone() {
    console.log("reminder marked done");
    this.eventsService.create({
      type: EventType.DONE_REMINDER,
      prospect: this.reminder.prospect,
      date: new Date,
      description: `${EventDescriptionType.DONE_REMINDER} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.remindersService.markDone(this.reminder.id);
  }
}
