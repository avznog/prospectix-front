import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  
  constructor(
    public meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    console.log(this.meetingsService.meetings)
  }

  pageDown() {
    this.meetingsService.updateSearchParameters({
      ...this.meetingsService.researchParamsMeeting,
      skip: this.meetingsService.researchParamsMeeting.skip - 20
    });
  }

  pageUp() {
    this.meetingsService.updateSearchParameters({
      ...this.meetingsService.researchParamsMeeting,
      skip: this.meetingsService.researchParamsMeeting.skip + 20
    });
  }
}
