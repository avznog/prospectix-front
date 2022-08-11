import { Component, OnInit } from '@angular/core';
import { EMPTY, empty } from 'rxjs/internal/observable/empty';
import { Meeting } from 'src/app/models/meeting.model';
import { ResearchParamsMeeting } from 'src/app/models/research-params-meeting.model';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  meetings!: Meeting[];
  researchParamsMeeting : ResearchParamsMeeting = {
    take: 2,
    skip: 0,
    done: "false",
    oldOrNew: "new",
    keyword: ""
  };
  
  constructor(
    private meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.meetingsService.findAllPaginated(this.researchParamsMeeting)
      .subscribe({
        next: (data) => {
          this.meetings = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  pageDown() {
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      skip: this.researchParamsMeeting.skip! - 2
    });
  }

  pageUp() {
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      skip: this.researchParamsMeeting.skip! + 2
    });
  }

  updateResearchParamsMeeting(newResearchParamsMeeting: ResearchParamsMeeting) {
    this.researchParamsMeeting = newResearchParamsMeeting;
    this.updateMeetings(this.researchParamsMeeting);
  }

  updateMeetings(researchParamsMeeting: ResearchParamsMeeting) {
    this.meetingsService.findAllPaginated(researchParamsMeeting)
      .subscribe({
        next: (data) => {
          this.meetings = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }
}
