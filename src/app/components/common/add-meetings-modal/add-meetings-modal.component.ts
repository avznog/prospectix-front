import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { MeetingType } from 'src/app/constants/meeting.type';
import { Prospect } from 'src/app/models/prospect.model';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-add-meetings-modal',
  templateUrl: './add-meetings-modal.component.html',
  styleUrls: ['./add-meetings-modal.component.scss']
})
export class AddMeetingsModalComponent implements OnInit {

  date: Date = new Date;
  type: MeetingType = MeetingType.EXT;
  
  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];
  @Input() prospect!: Prospect;
  

  constructor(
    private readonly meetingsService: MeetingsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onCreateMeeting() {
    this.meetingsService.create({
      type: this.type,
      date: this.date,
      done: false,
      prospect: this.prospect,
    });

    this.eventsService.create({
      type: EventType.ADD_MEETING,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.ADD_MEETING} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    console.log("meeting created !");
  }
}
