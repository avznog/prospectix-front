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
    console.log(this.formKeyword.value)
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      keyword: this.formKeyword.value
    });
  }

  onEditOldOrNew() {
    console.log(this.formOldOrNew.value)
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      oldOrNew: this.formOldOrNew.value
    });
  }

  onEditDone() {
    console.log(this.formDone.value)
    this.updateResearchParamsMeeting({
      ...this.researchParamsMeeting,
      done: this.formDone.value
    });
  }

  onEditType() {
    console.log(this.formType.value)
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
    console.log(this.formDateDown.value)
  }

  onEditDateUp() {
    console.log(this.formDateUp.value)
  }

  updateResearchParamsMeeting(value: ResearchParamsMeeting) {
    this.updateResearchParamsMeetingEvent.emit(value);
  }

}
