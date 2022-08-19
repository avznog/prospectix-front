import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { Meeting } from 'src/app/models/meeting.model';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-each-meeting',
  templateUrl: './each-meeting.component.html',
  styleUrls: ['./each-meeting.component.scss']
})
export class EachMeetingComponent implements OnInit {

  @Input() meeting!: Meeting;

  constructor(
    private readonly meetingsService: MeetingsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onDeleteMeeting() : Subscription {
    console.log("meeting deleted");
    this.eventsService.create({
      type: EventType.DELETE_MEETING,
      prospect: this.meeting.prospect,
      date: new Date,
      description: `${EventDescriptionType.DELETE_MEETING} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.meetingsService.deleteMeeting(this.meeting.id);
  }

  onMarkMeetingDone() : Subscription {
    console.log("meeting marked done");
    this.eventsService.create({
      type: EventType.DONE_MEETING,
      prospect: this.meeting.prospect,
      date: new Date,
      description: `${EventDescriptionType.DONE_MEETING} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.meetingsService.markDone(this.meeting.id);
  }

  onMarkMeetingUndone() : Subscription {
    console.log("meeting marked undone");
    return this.meetingsService.markUndone(this.meeting.id);
  }
}
