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

  keyword: string = "";
  oldOrNew: string = "new";
  done: boolean = false;
  type: string = "";
  dateDown: Date = new Date;
  dateUp: Date = new Date;

  constructor(
    public meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
  }

  onEditKeyword() {
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      keyword: this.keyword
    });
  }

  onEditOldOrNew() {
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      oldOrNew: this.oldOrNew
    });
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

  onEditDateDown() {
  }

  onEditDateUp() {
  }

}
