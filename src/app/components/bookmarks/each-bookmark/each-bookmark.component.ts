import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-each-bookmark',
  templateUrl: './each-bookmark.component.html',
  styleUrls: ['./each-bookmark.component.scss']
})
export class EachBookmarkComponent implements OnInit {

  @Input() bookmark!: Bookmark;
  formComment = new FormControl("");
  constructor(
    private readonly prospectService: ProspectsService,
    public readonly bookmarksService: BookmarksService,
    private readonly eventsService: EventsService
  ) { }

  ngOnInit(): void {
  }

  onClickButtonGoogle() {
    window.open(`http://www.google.fr/search?q=${this.bookmark.prospect.companyName}`, "_blank");
  }

  onChangeComment() {
    if (this.formComment.value != "")
      this.prospectService.updateComment(this.bookmark.prospect.id, { comment: this.formComment.value });
  }

  onChangeNbNo() {
    this.prospectService.updateNbNo(this.bookmark.prospect.id, { nbNo: this.bookmark.prospect.nbNo + 1 });
  }

  onDeleteBookmark() {
    let pm = {
      "id": 1,
      "pseudo": "bgonzva",
      "admin": true,
      "name": "Gonzva",
      "firstname": "Benjamin",
      "mail": "bgonzva@juniorisep.com",
      "tokenEmail": "",
      "disabled": false,
      "goals": [
         
      ],
      "meetings": [
          
      ],
      "reminders": [
         
      ],
      "sentEmails": [],
      "bookmarks": [],
      "events": []
    };
    this.eventsService.create({
      type: EventType.DELETE_BOOKMARKS,
      prospect: this.bookmark.prospect,
      pm: pm,
      date: new Date,
      description: EventDescriptionType.DELETE_BOOKMARKS
    });
    this.prospectService.updateIsBookmarked(this.bookmark.prospect.id, { isBookmarked: false });
    this.bookmarksService.deleteByProspect(this.bookmark.prospect.id);
  }

  onClickRefus() {
    let pm = {
      "id": 1,
      "pseudo": "bgonzva",
      "admin": true,
      "name": "Gonzva",
      "firstname": "Benjamin",
      "mail": "bgonzva@juniorisep.com",
      "tokenEmail": "",
      "disabled": false,
      "goals": [
         
      ],
      "meetings": [
          
      ],
      "reminders": [
         
      ],
      "sentEmails": [],
      "bookmarks": [],
      "events": []
    };
    this.eventsService.create({
      type: EventType.NEGATIVE_ANSWER,
      prospect: this.bookmark.prospect,
      pm: pm,
      date: new Date,
      description: EventDescriptionType.NEGATIVE_ANSWER
    });
    this.prospectService.disable(this.bookmark.prospect.id);
  }

  onClickDrawer() {
    this.eventsService.updateEvents(this.bookmark.prospect.id);
  }

}
