import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { MeetingType } from 'src/app/constants/meeting.type';
import { Prospect } from 'src/app/models/prospect.model';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-add-meetings-dropdown',
  templateUrl: './add-meetings-dropdown.component.html',
  styleUrls: ['./add-meetings-dropdown.component.scss']
})
export class AddMeetingsDropdownComponent implements OnInit {

  formDate = new FormControl(new Date);
  formType = new FormControl(MeetingType.EXT);
  formDescription = new FormControl("");
  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];
  @Input() prospect!: Prospect;
  

  constructor(
    private readonly meetingsService: MeetingsService,
    private readonly eventsService: EventsService
  ) { }

  ngOnInit(): void {
  }

  onCreateMeeting() {
    this.meetingsService.create({
      type: this.formType.value,
      date: this.formDate.value,
      done: false,
      prospect: this.prospect,
    });

    this.eventsService.create({
      type: EventType.ADD_MEETING,
      prospect: this.prospect,
      date: new Date,
      description: EventDescriptionType.ADD_MEETING
    });
    console.log("meeting created !");
  }
}
