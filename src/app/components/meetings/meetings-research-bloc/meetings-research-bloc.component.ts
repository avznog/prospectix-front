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

  done: boolean = false;
  type: MeetingType | null = null;
  keyword: string | null = null;

  constructor(
    public meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.done = this.meetingsService.researchParamsMeeting.done == 1 ? true : false;
    this.type = localStorage.getItem('meetings-type') != '' ? localStorage.getItem('meetings-type') as MeetingType : null;
  }

  updateParameters() {
    localStorage.setItem('meetings-type', this.type! ?? '');
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      keyword: this.keyword != '' ? this.keyword : null,
      done: this.done ? 1 : 0,
      type: this.type ?? null
    })
  }

}
