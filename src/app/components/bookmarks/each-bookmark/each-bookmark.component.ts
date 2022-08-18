import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Event } from 'src/app/models/event.model';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-each-bookmark',
  templateUrl: './each-bookmark.component.html',
  styleUrls: ['./each-bookmark.component.scss']
})
export class EachBookmarkComponent implements OnInit {

  @Input() prospect!: Prospect;
  // currentProspectMeetings : Meeting[] = [];
  // currentProspectReminders : Reminder[] = [];
  formComment = new FormControl("");
  currentPm!: string;
  @Input() bookmarks!: Bookmark[];

  @Input() events!: Event[];
  @Output() updateEventsEvent = new EventEmitter<Event[]>();


  constructor(
    private readonly prospectService: ProspectsService,
    public readonly meetingsService: MeetingsService,
    public readonly remindersService: RemindersService,
    private readonly bookmarksService: BookmarksService,
    private readonly eventsService: EventsService
  ) { }

  ngOnInit(): void {
  
    const result = this.bookmarks.some((bookmark) => {
      if(bookmark.prospect.id == this.prospect.id)
        this.currentPm = bookmark.pm.pseudo;
        return bookmark.prospect.id == this.prospect.id;
     });
     this.meetingsService.updateMeetingsForProspect(this.prospect.id);
     this.remindersService.updateRemindersForProspect(this.prospect.id);
  }

  onClickButtonGoogle() {
    window.open(`http://www.google.fr/search?q=${this.prospect.companyName}`, "_blank");
  }

  onChangeComment() {
    if (this.formComment.value != "")
      this.prospectService.updateComment(this.prospect.id, { comment: this.formComment.value });
  }

  onChangeNbNo() {
    this.prospectService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 });
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
      prospect: this.prospect,
      pm: pm,
      date: new Date,
      description: EventDescriptionType.DELETE_BOOKMARKS
    });
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: false });
    this.bookmarksService.deleteByProspect(this.prospect.id);
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
    this.eventsService.findAllByProspect(this.prospect.id)
    .subscribe({
      next: (data) => {
        this.updateEvents(data);
      },
      error: (err) => {
        console.log(err)
      }
    });
    
  }

  updateEvents(value: Event[]) {
    this.updateEventsEvent.emit(value);
  }

}
