import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { EventsService } from 'src/app/services/events/events.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { WebsitesService } from 'src/app/services/websites/websites.service';

@Component({
  selector: 'app-each-bookmark',
  templateUrl: './each-bookmark.component.html',
  styleUrls: ['./each-bookmark.component.scss']
})
export class EachBookmarkComponent implements OnInit {

  @Input() bookmark!: Bookmark;
  comment: string = "";
  phone: string = "";
  email: string = "";
  website: string = "";

  constructor(
    private readonly prospectService: ProspectsService,
    public readonly bookmarksService: BookmarksService,
    private readonly eventsService: EventsService,
    public authService: AuthService,
    private phonesService: PhonesService,
    private emailsService: EmailsService,
    private websitesService: WebsitesService
  ) { }

  ngOnInit(): void {
    this.phone = this.bookmark.prospect.phone.number;
    this.email = this.bookmark.prospect.email.email;
    this.website = this.bookmark.prospect.website.website;
  }

  onClickButtonGoogle() {
    window.open(`http://www.google.fr/search?q=${this.bookmark.prospect.companyName}`, "_blank");
  }

  onChangeComment() {
    if (this.comment != "")
      this.prospectService.updateComment(this.bookmark.prospect.id, { comment: this.comment });
      this.bookmarksService.bookmarks.set(this.bookmark.id, { ...this.bookmark, prospect: { ...this.bookmark.prospect, comment: this.comment }});
  }

  onChangeNbNo() {
    this.prospectService.updateNbNo(this.bookmark.prospect.id, { nbNo: this.bookmark.prospect.nbNo + 1 });
    this.bookmarksService.bookmarks.set(this.bookmark.id, { ...this.bookmark, prospect: { ...this.bookmark.prospect, nbNo: this.bookmark.prospect.nbNo + 1}})
  }

  onDeleteBookmark() {
    this.eventsService.create({
      type: EventType.DELETE_BOOKMARKS,
      prospect: this.bookmark.prospect,
      date: new Date,
      description: `${EventDescriptionType.DELETE_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    this.prospectService.updateIsBookmarked(this.bookmark.prospect.id, { isBookmarked: false });
    this.bookmarksService.deleteByProspect(this.bookmark.prospect.id);
    this.bookmarksService.bookmarks.delete(this.bookmark.id);
  }

  onClickRefus() {
    this.eventsService.create({
      type: EventType.NEGATIVE_ANSWER,
      prospect: this.bookmark.prospect,
      date: new Date,
      description: `${EventDescriptionType.NEGATIVE_ANSWER} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    this.prospectService.disable(this.bookmark.prospect.id);
    this.bookmarksService.bookmarks.set(this.bookmark.id, { ...this.bookmark, prospect: { ...this.bookmark.prospect, disabled: true}});
  }

  onClickDrawer() {
    this.eventsService.updateEvents(this.bookmark.prospect.id);
  }
  
  onChangePhone() {
    this.phonesService.update(this.bookmark.prospect, { ...this.bookmark.prospect.phone, number: this.phone });
  }

  onChangeEmail() {
    this.emailsService.update(this.bookmark.prospect, { ...this.bookmark.prospect.email, email: this.email});
  }

  onChangeWebsite() {
    this.websitesService.update(this.bookmark.prospect, { ...this.bookmark.prospect.website, website: this.website });
  }

  onClickPhone() {
    window.open(`tel:${this.phone}`, "_blank")
  }

  onClickEmail() {
    window.open(`mailto:${this.email}`, "_blank")
  }

  onClickWebsite() {
    window.open(`http://${this.website}`, "_blank")
  }
}
