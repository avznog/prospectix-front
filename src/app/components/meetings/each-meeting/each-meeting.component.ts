import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-each-meeting',
  templateUrl: './each-meeting.component.html',
  styleUrls: ['./each-meeting.component.scss']
})
export class EachMeetingComponent implements OnInit {

  @Input() meeting!: Meeting;

  constructor(
    private readonly meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
  }

  onDeleteMeeting() : Subscription {
    console.log("meeting deleted");
    return this.meetingsService.deleteMeeting(this.meeting.id);
  }

  onMarkMeetingDone() : Subscription {
    console.log("meeting marked done");
    return this.meetingsService.markDone(this.meeting.id);
  }

  onMarkMeetingUndone() : Subscription {
    console.log("meeting marked undone");
    return this.meetingsService.markUndone(this.meeting.id);
  }
}
