import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Meeting } from 'src/app/models/meeting.model';
import { Reminder } from 'src/app/models/reminder.model';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { City } from 'src/app/models/city.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Router } from '@angular/router';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';


@Component({
  selector: 'app-each-prospect',
  templateUrl: './each-prospect.component.html',
  styleUrls: ['./each-prospect.component.scss']
})
export class EachProspectComponent implements OnInit {

  @Input() date!: Date;
  //meetings
  @Input() meeting!: Meeting;
  @Input() meetingsDone!: boolean;
  @Input() futureMeetings!: boolean;
  @Input() previousMeetings!: boolean;
  @Input() typeMeeting!: string;
  @Input() meetingsDateDown!: Date;
  @Input() meetingsDateUp!: Date;
  

  today = new Date();
  changeCommentForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,

    //prospect
    private prospectService: ProspectsService,

    //reminders
    private remindersService: RemindersService,

    //meetings
    private meetingsService: MeetingsService,

    //bookmarks
    private bookmarksService: BookmarksService,

    //router
    private router: Router
   
  ) { }

  ngOnInit(): void {
    this.changeCommentForm = this.formBuilder.group({
      comment: [
         this.meeting.prospect.comment, Validators.required]
    });
  

  }

  
  onDeleteMeeting(idMeeting: number) : Subscription {
    console.log("meeting deleted");
    return this.meetingsService.deleteMeeting(idMeeting);
  }

  onMarkMeetingDone(idMeeting: number) : Subscription {
    console.log("meeting marked done");
    return this.meetingsService.markDone(idMeeting);
  }

  onMarkMeetingUndone(idMeeting: number) : Subscription {
    console.log("meeting marked undone");
    return this.meetingsService.markUndone(idMeeting);
  }

  // onClickButtonGoogle() {
  //   if(this.prospect) {
  //     window.open(`http://www.google.fr/search?q=${this.prospect.companyName}`, "_blank")
  //   } else if (this.meeting) {
  //     window.open(`http://www.google.fr/search?q=${this.meeting.prospect.companyName}`, "_blank")
  //   }
  // }

  // onChangeComment() {
  //   if(this.changeCommentForm.value["comment"] != ""){
  //     if(this.prospect) {
  //       this.prospectService.updateComment(this.prospect.id, { comment: this.changeCommentForm.value["comment"] });
  //     } else if (this.meeting) {
  //       this.prospectService.updateComment(this.meeting.prospect.id, { comment: this.changeCommentForm.value["comment"] });
  //     }
  //   }
  // }

  // onChangeNbNo() {
  //   if(this.prospect) {
  //     this.prospectService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 });
  //   } else if (this.meeting) {
  //     this.prospectService.updateNbNo(this.meeting.prospect.id, { nbNo: this.meeting.prospect.nbNo + 1 });
  //   }
  // }
  onEditProspect() {
    this.router.navigate(['prospect-details']);
  }

  onCreateBookmark(prospect: Prospect) {
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
      prospect: prospect,
      pm: pm,
      creationDate: new Date()
    };
    this.bookmarksService.create(createBookmarkDto);
    this.prospectService.updateIsBookmarked(prospect.id, { isBookmarked: true });
    console.log("added to bookmarks");
  }

  onDeleteBookmark(prospect: Prospect) {
    this.prospectService.updateIsBookmarked(prospect.id, { isBookmarked: false });
    this.bookmarksService.deleteByProspect(prospect.id);
    console.log("removed from bookmarks");
  }
}
