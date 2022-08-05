import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MeetingType } from 'src/app/constants/meeting.type';
import { Prospect } from 'src/app/models/prospect.model';
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
    private meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
  }

  onCreateMeeting() {
    // TODO : add current pm
    let pm = {
      "id": 1,
      "pseudo": "bgonzva",
      "admin": true,
      "name": "Gonzva",
      "firstname": "Benjamin",
      "mail": "bgonzva@juniorisep.com",
      "tokenEmail": "",
      "disabled": false,
      "goals": [
         
      ],
      "meetings": [
          
      ],
      "reminders": [
         
      ],
      "sentEmails": [],
      "bookmarks": [],
      "events": []
    };

    this.meetingsService.create({
      type: this.formType.value,
      date: this.formDate.value,
      done: false,
      prospect: this.prospect,
      pm: pm
    });
    console.log("meeting created ! ATTENTION: current pm to implement");
  }
}
