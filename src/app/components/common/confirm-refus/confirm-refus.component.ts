import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
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
  selector: 'app-confirm-refus',
  templateUrl: './confirm-refus.component.html',
  styleUrls: ['./confirm-refus.component.scss']
})
export class ConfirmRefusComponent implements OnInit {

  @Input() prospect!: Prospect;
  @Input() reminder!: Reminder;

  constructor(
    private readonly prospectService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
    private readonly statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
  }

  
  onClickRefus() {
    this.prospect.stage == 2 && this.onMarkReminderDone();

    // Counting as a call
    (this.prospect.stage == 0 || this.prospect.stage == 1) && this.statisticsService.createCallForMe({
      prospect: this.prospect,
      date: new Date
    });

    // Counting as a refus 
    (this.prospect.stage == 0 || this.prospect.stage == 1) && this.statisticsService.createNegativeAnswerForMe({
      prospect: this.prospect,
      date: new Date
    });

    
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.ARCHIVED });
    this.remindersService.updateByStage(this.prospect.id, { stage: StageType.ARCHIVED });
    this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.ARCHIVED });
    this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.ARCHIVED });
    this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.ARCHIVED });
    
    this.eventsService.create({
      type: EventType.NEGATIVE_ANSWER,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.NEGATIVE_ANSWER} ${this.authService.currentUserSubject.getValue().pseudo}`
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
