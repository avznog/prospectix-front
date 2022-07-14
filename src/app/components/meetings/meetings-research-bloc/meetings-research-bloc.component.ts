import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingType } from 'src/app/constants/meeting.type';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-meetings-research-bloc',
  templateUrl: './meetings-research-bloc.component.html',
  styleUrls: ['./meetings-research-bloc.component.scss']
})
export class MeetingsResearchBlocComponent implements OnInit {

  formSearchMeetings!: FormGroup;

  @Input() meetings!: Meeting[];
  @Input() meetingsDone!: boolean;
  @Input() date!: Date;
  @Input() futureMeetings!: boolean;
  @Input() previousMeetings!: boolean;
  @Input() typeMeeting!: string;
  @Output() updateMeetingsDoneEvent = new EventEmitter<boolean>();
  @Output() updateDateEvent = new EventEmitter<Date>();
  @Output() updateFutureMeetingsEvent = new EventEmitter<boolean>();
  @Output() updatePreviousMeetingsEvent = new EventEmitter<boolean>();
  @Output() updateTypeMeetingEvent = new EventEmitter<string>();
  @Output() updateMeetingsEvent = new EventEmitter<Meeting[]>();

  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];
  

  constructor(
    private formBuilder: FormBuilder,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.formSearchMeetings = this.formBuilder.group({
      searchBar: ["", Validators.required],
      date: [Date, Validators.required],
      futureMeetings: [true, Validators.required],
      previousMeetings: [true, Validators.required],
      meetingsDone: [true, Validators.required],
      typeMeeting: ["", Validators.required]
    })
  }

  onMeetingsEditSearchBar() {
    if(this.formSearchMeetings.value["searchBar"] != "") {
      this.meetingsService.findAllByKeyword(this.formSearchMeetings.value["searchBar"])
        .subscribe({
          next: (data) => {
            this.updateMeetings(data);
          },
          error: (err) => {
            console.log(err)
          }
        })
    } else {
      this.meetingsService.findAll()
        .subscribe({
          next: (data) => (
            this.updateMeetings(data)
          ),
          error: (err) => {
            console.log(err)
          }
        });
    }
  }

  onMeetingsDateChange() {
    this.updateDate(this.formSearchMeetings.value["date"]);
  }

  onChangeFutureMeetings() {
    this.updateFutureMeetings(this.formSearchMeetings.value["futureMeetings"])
  }

  onChangePreviousMeetings() {
    this.updatePreviousMeetings(this.formSearchMeetings.value["previousMeetings"])
  }

  onChangeMeetingsDone() {
    this.updateMeetingsDone(this.formSearchMeetings.value["meetingsDone"]);
  }

  onChangeMeetingType() {
    this.updateTypeMeeting(this.formSearchMeetings.value["typeMeeting"].toLowerCase())
  }


  updateMeetingsDone(value: boolean) {
    this.updateMeetingsDoneEvent.emit(value);
  }

  updateDate(value: Date) {
    this.updateDateEvent.emit(value)
  }

  updateFutureMeetings(value: boolean) {
    this.updateFutureMeetingsEvent.emit(value);
  }

  updatePreviousMeetings(value: boolean) {
    this.updatePreviousMeetingsEvent.emit(value)
  }

  updateTypeMeeting(value: string) {
    this.updateTypeMeetingEvent.emit(value);
  }

  updateMeetings(value: Meeting[]) {
    this.updateMeetingsEvent.emit(value);
  }

}
