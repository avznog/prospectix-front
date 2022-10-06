import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'app-add-mail-modal',
  templateUrl: './add-mail-modal.component.html',
  styleUrls: ['./add-mail-modal.component.scss']
})
export class AddMailModalComponent implements OnInit {

  @Input() prospect!: Prospect;
  @Input() reminder!: Reminder;
  @Input() meeting!: Meeting;

  constructor(
    private readonly prospectService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly authService: AuthService,
    private readonly eventsService: EventsService,
    private readonly toastsService: ToastsService,
    private readonly statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
  }

  onClickSentEmail() {
    this.prospect.stage == 2 && this.onMarkReminderDone();
    this.prospect.stage == 3 && this.onMarkMeetingDone();

    // counting as a call
    (this.prospect.stage == 0 || this.prospect.stage == 1) && this.statisticsService.createCallForMe({
      prospect: this.prospect,
      date: new Date
    });


    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.MAIL });
    this.remindersService.updateByStage(this.prospect.id, { stage: StageType.MAIL });
    this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.MAIL });
    this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.MAIL });
    this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.MAIL });
    this.sentEmailsService.create({
      sendingDate: new Date,
      message: "",
      object: "",
      prospect: this.prospect,
      pm: this.authService.currentUserSubject.getValue()
    });

    this.eventsService.create({
      type: EventType.ADD_SENT_EMAIL,
      date: new Date,
      description: EventDescriptionType.ADD_SENT_EMAIL,
      pm: this.authService.currentUserSubject.getValue(),
      prospect: this.prospect
    });

    this.toastsService.addToast({
      type: "alert-success",
      message: "Email bien ajouté"
    });

    console.log("email compatibilisé")
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

  onMarkMeetingDone() {
    console.log("meeting marked done");
    this.eventsService.create({
      type: EventType.DONE_MEETING,
      prospect: this.meeting.prospect,
      date: new Date,
      description: `${EventDescriptionType.DONE_MEETING} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.meetingsService.markDone(this.meeting.id);
  }

}
