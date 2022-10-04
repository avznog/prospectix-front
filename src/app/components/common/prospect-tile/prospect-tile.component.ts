import { Component, Input, OnInit } from '@angular/core';
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
import { EmailsService } from 'src/app/services/emails/emails.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
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

  emailShown: boolean = false;
  websiteShown: boolean = false;
  phoneOn: boolean = false;

  constructor(
    private readonly prospectService: ProspectsService,
    public readonly bookmarksService: BookmarksService,
    private readonly eventsService: EventsService,
    public readonly authService: AuthService,
    private readonly phonesService: PhonesService,
    private readonly emailsService: EmailsService,
    private readonly websitesService: WebsitesService,
    private readonly meetingsService: MeetingsService,
    private readonly remindersService: RemindersService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly toastsService: ToastsService
  ) { }

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
      this.comment != "" && this.prospectService.updateComment(this.prospect.id, { comment: this.comment });
  }

  onChangeNbNo() {
      this.prospectService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 });
      this.bookmarksService.updateNbNo(this.prospect.id);
      this.eventsService.create({
        type: EventType.NO_ANSWER,
        prospect: this.prospect,
        date: new Date,
        description: `${EventDescriptionType.NO_ANSWER} ${this.authService.currentUserSubject.getValue().pseudo}`
      });
  }


  onDeleteBookmark() {
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
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
    this.toastsService.addToast({
      type: "alert-error",
      message: "Supprimé des favorisé"
    })
  }

  onClickDrawer() {
    this.eventsService.updateEvents(this.prospect.id);
  }

  onChangePhone() {
    this.phonesService.update(this.prospect, { ...this.prospect.phone, number: this.phone });
    this.toastsService.addToast({
      type: "alert-info",
      message: "Numéro de téléphone changé"
    })
  }

  onChangeEmail() {
    this.emailsService.update(this.prospect, { ...this.prospect.email, email: this.email});
    this.toastsService.addToast({
      type: "alert-info",
      message: "Email changé"
    })
  }

  onChangeWebsite() {
    this.websitesService.update(this.prospect, { ...this.prospect.website, website: this.website });
    this.toastsService.addToast({
      type: "alert-info",
      message: "Site internet changé"
    })
  }

  onClickPhone() {
    window.open(`tel:${this.phone}`, "_blank")
  }

  onClickEmail() {
    // TODO : copier le mail
    // window.open(`mailto:${this.email}`, "_blank")
  }

  onClickWebsite() {
    window.open(`${this.website.includes("http") ? this.website : 'http://' + this.website}`, "_blank")
  }
}
