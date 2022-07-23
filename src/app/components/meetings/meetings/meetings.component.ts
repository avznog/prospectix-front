import { Component, OnInit } from '@angular/core';
import { EMPTY, empty } from 'rxjs/internal/observable/empty';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  meetings!: Meeting[];
  meetingsDone!: boolean;
  previousMeetings!: boolean;
  futureMeetings!: boolean;
  date!: Date;
  typeMeeting!: string;
  meetingsDateDown!: Date;
  meetingsDateUp!: Date;
  
  constructor(
    private meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.meetingsService.findAll()
      .subscribe({
        next: (data) => {
          this.meetings = data.sort((a: Meeting, b :Meeting) => new Date(a.date).getTime() - new Date(b.date).getTime());
        },
        error: (err) => {
          console.log(err)
        }
      });
      this.meetingsDone = false;
      this.futureMeetings = true;
      this.previousMeetings = true;
      this.typeMeeting = "tous les types";
  }

  updateMeetingsDone(newMeetingsDone: boolean) {
    this.meetingsDone = newMeetingsDone;
  }

  updateDate(newDate: Date) {
    this.date = newDate;
  }

  updatePreviousMeetings(newPreviousMeetings: boolean) {
    this.previousMeetings = newPreviousMeetings;
  }

  updateFutureMeetings(newFutureMeetings: boolean) {
    this.futureMeetings = newFutureMeetings;
  }

  updateTypeMeeting(newTypeMeeting: string) {
    this.typeMeeting = newTypeMeeting;
  }

  updateMeetings(newMeetings: Meeting[]) {
    this.meetings = newMeetings.sort((a: Meeting, b :Meeting) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  updateMeetingsDateUp(newMeetingsDateUp: Date) {
    this.meetingsDateUp = newMeetingsDateUp;
  }

  updateMeetingsDateDown(newMeetingsDone: Date) {
    this.meetingsDateDown = newMeetingsDone;
  }

}
