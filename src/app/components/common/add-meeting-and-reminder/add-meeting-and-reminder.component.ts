import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-add-meeting-and-reminder',
  templateUrl: './add-meeting-and-reminder.component.html',
  styleUrls: ['./add-meeting-and-reminder.component.scss']
})
export class AddMeetingAndReminderComponent implements OnInit {

  constructor(
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
  }

}
