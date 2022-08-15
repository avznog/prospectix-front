import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
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
  currentProspectMeetings : Meeting[] = [];
  currentProspectReminders : Reminder[] = [];
  formComment = new FormControl("");
  currentPm!: string;
  @Input() bookmarks!: Bookmark[];


  constructor(
    private readonly prospectService: ProspectsService,
    private readonly meetingsService: MeetingsService,
    private readonly remindersService: RemindersService,
    private readonly bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
  
    const result = this.bookmarks.some((bookmark) => {
      if(bookmark.prospect.id == this.prospect.id)
        this.currentPm = bookmark.pm.pseudo;
        return bookmark.prospect.id == this.prospect.id;
     });

  this.meetingsService.findAllByProspect(this.prospect.id).subscribe({
    next: (data) => {
      this.currentProspectMeetings = data;
    },
    error: (err) => {
      console.log(err)
    }
  });

  this.remindersService.findAllByProspect(this.prospect.id).subscribe({
    next: (data) => {
      this.currentProspectReminders = data;
    },
    error: (err) => {
      console.log(err);
    }
  });
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
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: false });
    this.bookmarksService.deleteByProspect(this.prospect.id);
  }

  onClickRefus() {
    this.prospectService.disable(this.prospect.id);
  }

}
