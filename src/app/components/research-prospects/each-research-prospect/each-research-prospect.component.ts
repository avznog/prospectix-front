import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-each-research-prospect',
  templateUrl: './each-research-prospect.component.html',
  styleUrls: ['./each-research-prospect.component.scss']
})
export class EachResearchProspectComponent implements OnInit {

  @Input() prospect!: Prospect;

  formComment = new FormControl("");
  
  constructor(
    private readonly prospectService: ProspectsService,
    private readonly bookmarksService: BookmarksService,
    public readonly meetingsService: MeetingsService,
    public readonly remindersService: RemindersService,
    private readonly eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.meetingsService.updateMeetingsForProspect(this.prospect.id);
    this.remindersService.updateRemindersForProspect(this.prospect.id);
  }

  onClickButtonGoogle() {
      window.open(`http://www.google.fr/search?q=${this.prospect.companyName}`, "_blank");
  }

  onChangeComment() {
    if(this.formComment.value != "")
      this.prospectService.updateComment(this.prospect.id, { comment: this.formComment.value });
  }

  onChangeNbNo() {
      this.prospectService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 });
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
        type: EventType.NO_ANSWER,
        prospect: this.prospect,
        pm: pm,
        date: new Date,
        description: EventDescriptionType.NO_ANSWER
      });
  }

  onCreateBookmark() {
    // TODO : ADD for current pm
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

    const createBookmarkDto: CreateBookmarkDto = {
      prospect: this.prospect,
      pm: pm,
      creationDate: new Date()
    };
    this.bookmarksService.create(createBookmarkDto);
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: true });

    this.eventsService.create({
      type: EventType.ADD_BOOKMARKS,
      prospect: this.prospect,
      pm: pm,
      date: new Date,
      description: EventDescriptionType.ADD_BOOKMARKS
    });
    console.log("added to bookmarks");
  }

  onDeleteBookmark() {
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: false });
    this.bookmarksService.deleteByProspect(this.prospect.id);
    console.log("removed from bookmarks");
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
      prospect: this.prospect,
      pm: pm,
      date: new Date,
      description: EventDescriptionType.DELETE_BOOKMARKS
    });
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
      prospect: this.prospect,
      pm: pm,
      date: new Date,
      description: EventDescriptionType.NEGATIVE_ANSWER
    });
    this.prospectService.disable(this.prospect.id);
  }

  onClickDrawer() {
    this.eventsService.updateEvents(this.prospect.id);
  }
}
