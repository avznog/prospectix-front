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

  @Input() researchParamsMeeting!: ResearchParamsMeeting;
  @Output() updateResearchParamsMeetingEvent = new EventEmitter<ResearchParamsMeeting>();


  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];
  formKeyword = new FormControl("");
  formOldOrNew = new FormControl("new");
  formDone = new FormControl(false);
  formType = new FormControl("");
  formDateDown = new FormControl(Date)
  formDateUp = new FormControl(Date)

  constructor() { }

  ngOnInit(): void {
    
  }

  onEditKeyword() {
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      keyword: this.formKeyword.value
    });
  }

  onEditOldOrNew() {
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      oldOrNew: this.formOldOrNew.value
    });
  }

  onEditDone() {
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      done: this.formDone.value
    });
  }

  onEditType() {
    if(this.formType.value != "allTypes")
      this.updateResearchParamsMeeting({
        ...this.researchParamsMeeting,
        type: this.formType.value
      });
    else
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      type: ""
    });
  }

  onEditDateDown() {
  }

  onEditDateUp() {
  }

  updateResearchParamsMeeting(value: ResearchParamsMeeting) {
    this.updateResearchParamsMeetingEvent.emit(value);
  }

}
