import { Component, OnInit } from '@angular/core';
import { MeetingType } from 'src/app/constants/meeting.type';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-meetings-research-bloc',
  templateUrl: './meetings-research-bloc.component.html',
  styleUrls: ['./meetings-research-bloc.component.scss']
})
export class MeetingsResearchBlocComponent implements OnInit {

  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];

  done: boolean | string = "";
  type: string = "Tous les types";

  constructor(
    public meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.type = "allTypes";
    this.done = this.meetingsService.researchParamsMeeting.done == "true" ? true : false
  }

  onEditDone() {
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      done: this.done.toString()
    });
  }

  onEditType() {
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      type: this.type != "allTypes" ? this.type : ""
    });
  }

}
