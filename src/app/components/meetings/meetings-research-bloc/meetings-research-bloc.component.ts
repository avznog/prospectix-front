import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { MeetingType } from 'src/app/constants/meeting.type';
import { ResearchParamsMeeting } from 'src/app/models/research-params-meeting.model';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-meetings-research-bloc',
  templateUrl: './meetings-research-bloc.component.html',
  styleUrls: ['./meetings-research-bloc.component.scss']
})
export class MeetingsResearchBlocComponent implements OnInit {

  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];
  formKeyword = new FormControl("");
  formOldOrNew = new FormControl("new");
  formDone = new FormControl(false);
  formType = new FormControl("");
  formDateDown = new FormControl(Date)
  formDateUp = new FormControl(Date)

  constructor(
    public meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
  }

  onEditKeyword() {
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      keyword: this.formKeyword.value
    });
  }

  onEditOldOrNew() {
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      oldOrNew: this.formOldOrNew.value
    });
  }

  onEditDone() {
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      done: this.formDone.value
    });
  }

  onEditType() {
    this.meetingsService.resetSearch({
      ...this.meetingsService.researchParamsMeeting,
      type: this.formType.value != "allTypes" ? this.formType.value : ""
    });
  }

  onEditDateDown() {
  }

  onEditDateUp() {
  }

}
