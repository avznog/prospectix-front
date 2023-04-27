import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { ReasonDisabledType } from 'src/app/constants/reasonDisabled.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
import { Bookmark } from 'src/app/models/bookmark.model';
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
  selector: 'app-action-prospect',
  templateUrl: './action-prospect.component.html',
  styleUrls: ['./action-prospect.component.scss'],
})
export class ActionProspectComponent implements OnInit {

  data : {
    type?: string;
    title?: string;
    reminder?: Reminder;
    prospect?: Prospect;
    meeting?: Meeting;
    bookmark?: Bookmark;
  } = {};

  reasonDisabledType = [ReasonDisabledType.ENTREPRISE_FERMEE, ReasonDisabledType.GRAND_GROUPE, ReasonDisabledType.MAL_ATTRIBUE, ReasonDisabledType.HOLDINGS];
  reason: ReasonDisabledType = ReasonDisabledType.MAL_ATTRIBUE;


  constructor(
    public readonly ngxSmartModalService: NgxSmartModalService,
    private readonly prospectService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly eventsService: EventsService,
    private readonly statisticsService: StatisticsService,
    private readonly authService: AuthService,
    private readonly toastsService: ToastsService
  ) {
  }

  ngOnInit(): void {
    this.data = this.ngxSmartModalService.getModalData('action-prospect');
  }

  closeModal() {
    this.ngxSmartModalService.close('action-prospect')
  }

  onRefus() {
    this.data.prospect!.stage == 2 && this.onMarkReminderDone();

    // Counting as a call
    (this.data.prospect!.stage == 0 || this.data.prospect!.stage == 1) && this.statisticsService.createCallForMe({
      prospect: this.data.prospect!,
      date: new Date
    });

    // Counting as a refus 
    (this.data.prospect!.stage == 0 || this.data.prospect!.stage == 1) && this.statisticsService.createNegativeAnswerForMe({
      prospect: this.data.prospect!,
      date: new Date
    });

    
    this.prospectService.updateByStage(this.data.prospect!.id, { stage: StageType.ARCHIVED });
    this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.ARCHIVED });
    this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.ARCHIVED });
    this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.ARCHIVED });
    this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.ARCHIVED });
    
    this.closeModal();
  }

  onEmail() {
    this.data.prospect!.stage == 2 && this.onMarkReminderDone();
    this.data.prospect!.stage == 3 && this.onMarkMeetingDone();

    // counting as a call
    (this.data.prospect!.stage == 0 || this.data.prospect!.stage == 1) && this.statisticsService.createCallForMe({
      prospect: this.data.prospect!,
      date: new Date
    });

    // adding a count to the sentemails
    (this.data.prospect!.stage == 0 || this.data.prospect!.stage == 1) && this.statisticsService.createSentEmailForMe();

    this.prospectService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL });
    this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL });
    this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL });
    this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL });
    this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL });
    this.sentEmailsService.create({
      date: new Date,
      templateName: "",
      object: "",
      prospect: this.data.prospect!,
      pm: this.authService.currentUserSubject.getValue(),
      sent: false,
    });

    this.closeModal();
  }

  onDisable() {
    if (this.data.prospect!.stage == 0) {
      this.prospectService.disable(this.data.prospect!.id, this.reason);
    } else if (this.data.prospect!.stage == 1) {
      this.prospectService.updateByStage(this.data.prospect!.id, { stage: StageType.RESEARCH }, this.data.bookmark!.prospect);
      this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.RESEARCH });
      this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.RESEARCH });
      this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.RESEARCH });
      this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.RESEARCH });
      this.bookmarksService.delete(this.data.bookmark!.id)
      this.prospectService.updateIsBookmarked(this.data.prospect!.id, { isBookmarked: false });

      console.log("removed from bookmarks");
      this.eventsService.create({
        type: EventType.DELETE_BOOKMARKS,
        prospect: this.data.prospect!,
        date: new Date,
        description: `${EventDescriptionType.DELETE_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
      });
      this.prospectService.disable(this.data.bookmark!.prospect.id, this.reason)
    }
    this.toastsService.addToast({
      type: "alert-error",
      message: "Prospect désactivé"
    });

    this.closeModal();
  }

  onPro() {
    console.log("hello world")
    this.data.prospect!.stage == 3 && this.onMarkMeetingDone();

    this.prospectService.updateByStage(this.data.prospect!.id, { stage: StageType.PRO });
    this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.PRO });
    this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.PRO });
    this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.PRO });
    this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.PRO });

    this.eventsService.create({
      type: EventType.PASSAGE_PRO,
      date: new Date,
      description: EventDescriptionType.PASSAGE_PRO,
      pm: this.authService.currentUserSubject.getValue(),
      prospect: this.data.prospect!
    });

    this.closeModal();
  }

  onBookmark() {
    this.prospectService.updateByStage(this.data.prospect!.id, { stage: StageType.BOOKMARK} );
    this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.BOOKMARK });
    this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.BOOKMARK });
    this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.BOOKMARK });
    this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.BOOKMARK });
    const createBookmarkDto: CreateBookmarkDto = {
      prospect: this.data.prospect!,
      creationDate: new Date()
    };
    this.bookmarksService.create(createBookmarkDto);
    this.prospectService.updateIsBookmarked(this.data.prospect!.id, { isBookmarked: true });
    
    this.closeModal();
  }

  onMeetingDone() {
    this.data.prospect!.stage == 3 && this.onMarkMeetingDone();

    this.prospectService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING_DONE_AND_OUT });
    this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING_DONE_AND_OUT });
    this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING_DONE_AND_OUT });
    this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING_DONE_AND_OUT });
    this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING_DONE_AND_OUT });

    this.eventsService.create({
      type: EventType.DONE_MEETING,
      date: new Date,
      description: EventDescriptionType.DONE_MEETING,
      pm: this.authService.currentUserSubject.getValue(),
      prospect: this.data.prospect!
    });

    this.closeModal();
  }

  onMarkReminderDone() {
    console.log("reminder marked done");
    this.eventsService.create({
      type: EventType.DONE_REMINDER,
      prospect: this.data.reminder!.prospect,
      date: new Date,
      description: `${EventDescriptionType.DONE_REMINDER} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.remindersService.markDone(this.data.reminder!.id);
  }

  onMarkMeetingDone() {
    console.log("meeting marked done");
    this.eventsService.create({
      type: EventType.DONE_MEETING,
      prospect: this.data.meeting!.prospect,
      date: new Date,
      description: `${EventDescriptionType.DONE_MEETING} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.meetingsService.markDone(this.data.meeting!.id);
  }

}
