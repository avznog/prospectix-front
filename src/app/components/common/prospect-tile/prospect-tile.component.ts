import { Component, Input, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { SentEmail } from 'src/app/models/sent-email.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { ProspectEditComponent } from '../../prospect-edit/prospect-edit.component';
import { ActionProspectComponent } from '../action-prospect/action-prospect.component';
import { AddMeetingAndReminderComponent } from '../add-meeting-and-reminder/add-meeting-and-reminder.component';
import { EditDateReminderMeetingComponent } from '../edit-date-reminder-meeting/edit-date-reminder-meeting.component';
import { MarkSentEmailSentComponent } from '../mark-sent-email-sent/mark-sent-email-sent.component';
import { ProspectHistoryComponent } from '../prospect-history/prospect-history/prospect-history.component';

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

  emailShown: boolean = false;
  websiteShown: boolean = false;
  phoneOn: boolean = false;

  constructor(
    private readonly prospectService: ProspectsService,
    public readonly bookmarksService: BookmarksService,
    private readonly eventsService: EventsService,
    public readonly authService: AuthService,
    private readonly meetingsService: MeetingsService,
    private readonly remindersService: RemindersService,
    private readonly sentEmailsService: SentEmailsService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) {
    this.ngxSmartModalService.create('action-prospect', ActionProspectComponent).addCustomClass('action-prospect');
    this.ngxSmartModalService.create('edit-date', EditDateReminderMeetingComponent).addCustomClass('action-prospect');
    this.ngxSmartModalService.create('add-meeting-reminder', AddMeetingAndReminderComponent).addCustomClass('action-prospect');
    this.ngxSmartModalService.create('history', ProspectHistoryComponent).addCustomClass('action-prospect');
    this.ngxSmartModalService.create('mail-sent', MarkSentEmailSentComponent).addCustomClass('action-prospect');
    this.ngxSmartModalService.create('prospect-edit', ProspectEditComponent).addCustomClass('add-prospect');
   }

  ngOnInit(): void {
    this.phone = this.prospect.phone.number;
    this.email = this.prospect.email.email;
    this.website = this.prospect.website.website;
    this.comment = this.prospect.comment;
    this.emailShown = false;
    this.websiteShown = false;
    this.phoneOn = false;
  }

  onClickButtonGoogle() {
      window.open(`http://www.google.fr/search?q=${this.prospect.companyName.replace('&','%26')}`, "_blank");
  }

  onChangeComment() {    
      this.comment != "" && (
        this.prospectService.updateComment(this.prospect.id, { comment: this.comment }),
        this.remindersService.updateCommentProspect(this.prospect.id, this.comment),
        this.meetingsService.updateCommentProspect(this.prospect.id, this.comment),
        this.sentEmailsService.updateCommentProspect(this.prospect.id, this.comment),
        this.bookmarksService.updateCommentProspect(this.prospect.id, this.comment)
        );
  }

  onChangeNbNo() {
      this.prospectService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 });
      this.bookmarksService.updateNbNo(this.prospect.id);
      this.eventsService.create({
        type: EventType.NO_ANSWER,
        prospect: this.prospect,
        date: new Date,
        description: `${EventDescriptionType.NO_ANSWER} à ${new Date().getHours()}:${new Date().getMinutes()} à ${this.authService.currentUserSubject.getValue().pseudo}`
      });
  }


  onDeleteBookmark() {
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH }, this.bookmark.prospect);
    this.remindersService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
    this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
    this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
    this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
    this.bookmarksService.delete(this.bookmark.id)
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: false });

    console.log("removed from bookmarks");
    this.eventsService.create({
      type: EventType.DELETE_BOOKMARKS,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.DELETE_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
  }

  onClickDrawer() {
    this.eventsService.updateEvents(this.prospect.id);
    this.ngxSmartModalService.getModal('history').removeData().setData({
      prospect: this.prospect && this.prospect
    }).open();
  }

  onClickPhone() {
    window.open(`tel:${this.phone}`, "_blank")
  }

  onClickEmail() {
    // TODO : copier le mail
    navigator.clipboard.writeText(this.email)
    // window.open(`mailto:${this.email}`, "_blank")
  }

  onClickWebsite() {
    window.open(`${this.website.includes("http") ? this.website : 'http://' + this.website}`, "_blank")
  }

}
