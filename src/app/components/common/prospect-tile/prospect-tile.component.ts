import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { SentEmail } from 'src/app/models/sent-email.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { WebsitesService } from 'src/app/services/websites/websites.service';

@Component({
  selector: 'app-prospect-tile',
  templateUrl: './prospect-tile.component.html',
  styleUrls: ['./prospect-tile.component.scss']
})
export class ProspectTileComponent implements OnInit {

  
  @Input() prospect!: Prospect;
  @Input() sentEmail!: SentEmail;
  @Input() reminder!: Reminder;
  @Input() meeting!: Meeting;
  @Input() bookmark!: Bookmark;

  comment: string = "";
  phone: string = "";
  email: string = "";
  website: string = "";

  constructor(
    private readonly prospectService: ProspectsService,
    private readonly bookmarksService: BookmarksService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
    private readonly phonesService: PhonesService,
    private readonly emailsService: EmailsService,
    private readonly websitesService: WebsitesService,
    private readonly meetingsService: MeetingsService,
    private readonly remindersService: RemindersService,
    private readonly sentEmailsService: SentEmailsService
  ) { }

  ngOnInit(): void {
    this.phone = this.prospect.phone.number;
    this.email = this.prospect.email.email;
    this.website = this.prospect.website.website;
    this.comment = this.prospect.comment;
  }

  onClickButtonGoogle() {
      window.open(`http://www.google.fr/search?q=${this.prospect.companyName}`, "_blank");
  }

  onChangeComment() {    
      this.comment != "" && this.prospectService.updateComment(this.prospect.id, { comment: this.comment });
  }

  onChangeNbNo() {
      this.prospectService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 });
      this.eventsService.create({
        type: EventType.NO_ANSWER,
        prospect: this.prospect,
        date: new Date,
        description: `${EventDescriptionType.NO_ANSWER} ${this.authService.currentUserSubject.getValue().pseudo}`
      });
  }

  onCreateBookmark() {
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.BOOKMARK });
    this.sentEmailsService.updateByStage(this.prospect.id, StageType.BOOKMARK)
    this.meetingsService.updateByStage(this.prospect.id, StageType.BOOKMARK);
    this.remindersService.updateByStage(this.prospect.id, StageType.BOOKMARK)
    this.bookmarksService.updateByStage(this.prospect.id, StageType.BOOKMARK)
    const createBookmarkDto: CreateBookmarkDto = {
      prospect: this.prospect,
      creationDate: new Date()
    };
    this.bookmarksService.create(createBookmarkDto);
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: true });

    this.eventsService.create({
      type: EventType.ADD_BOOKMARKS,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.ADD_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    console.log("added to bookmarks");
  }

  onDeleteBookmark() {
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
    this.sentEmailsService.updateByStage(this.prospect.id, StageType.RESEARCH)
    this.meetingsService.updateByStage(this.prospect.id, StageType.RESEARCH);
    this.remindersService.updateByStage(this.prospect.id, StageType.RESEARCH)
    this.bookmarksService.updateByStage(this.prospect.id, StageType.RESEARCH)
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: false });
    this.bookmarksService.deleteByProspect(this.prospect.id, this.bookmark.id);
    console.log("removed from bookmarks");
    this.eventsService.create({
      type: EventType.DELETE_BOOKMARKS,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.DELETE_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
  }

  onClickRefus() {
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.ARCHIVED });
    this.eventsService.create({
      type: EventType.NEGATIVE_ANSWER,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.NEGATIVE_ANSWER} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    this.prospectService.disable(this.prospect.id);
  }

  onClickSentEmail() {
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.MAIL });
    this.sentEmailsService.updateByStage(this.prospect.id, StageType.MAIL)
    this.meetingsService.updateByStage(this.prospect.id, StageType.MAIL);
    this.remindersService.updateByStage(this.prospect.id, StageType.MAIL)
    this.bookmarksService.updateByStage(this.prospect.id, StageType.MAIL)
    // this.prospect.meetings.forEach(meeting => this.meetingsService.deleteMeeting(meeting.id));
    // this.prospect.reminders.forEach(reminder => this.remindersService.deleteReminder(reminder.id));
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
    console.log("email compatibilisé")
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

  onClickDrawer() {
    this.eventsService.updateEvents(this.prospect.id);
  }

  onChangePhone() {
    this.phonesService.update(this.prospect, { ...this.prospect.phone, number: this.phone });
  }

  onChangeEmail() {
    this.emailsService.update(this.prospect, { ...this.prospect.email, email: this.email});
  }

  onChangeWebsite() {
    this.websitesService.update(this.prospect, { ...this.prospect.website, website: this.website });
  }

  onClickPhone() {
    window.open(`tel:${this.phone}`, "_blank")
  }

  onClickEmail() {
    window.open(`mailto:${this.email}`, "_blank")
  }

  onClickWebsite() {
    window.open(`${this.website.includes("http") ? this.website : 'http://' + this.website}`, "_blank")
  }
}
