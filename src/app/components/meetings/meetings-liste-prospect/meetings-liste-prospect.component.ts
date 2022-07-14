import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-meetings-liste-prospect',
  templateUrl: './meetings-liste-prospect.component.html',
  styleUrls: ['./meetings-liste-prospect.component.scss']
})
export class MeetingsListeProspectComponent implements OnInit {

  @Input() meetings!: Meeting[];
  @Input() meetingsDone!: boolean;
  @Input() date!: Date;
  @Input() futureMeetings!: boolean;
  @Input() previousMeetings!: boolean;
  @Input() typeMeeting!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
