import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-each-research-prospect',
  templateUrl: './each-research-prospect.component.html',
  styleUrls: ['./each-research-prospect.component.scss']
})
export class EachResearchProspectComponent implements OnInit {

  @Input() prospect!: Prospect;

  comment: string = "";
  
  constructor(
    private readonly prospectService: ProspectsService,
    private readonly bookmarksService: BookmarksService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
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
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: false });
    this.bookmarksService.deleteByProspect(this.prospect.id);
    console.log("removed from bookmarks");
    this.eventsService.create({
      type: EventType.DELETE_BOOKMARKS,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.DELETE_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
  }

  onClickRefus() {
    this.eventsService.create({
      type: EventType.NEGATIVE_ANSWER,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.NEGATIVE_ANSWER} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    this.prospectService.disable(this.prospect.id);
  }

  onClickDrawer() {
    this.eventsService.updateEvents(this.prospect.id);
  }
}
