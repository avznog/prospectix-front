import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { Prospect } from 'src/app/models/prospect.model';
import { EventsService } from 'src/app/services/events/events.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-add-reminder-dropdown',
  templateUrl: './add-reminder-dropdown.component.html',
  styleUrls: ['./add-reminder-dropdown.component.scss']
})
export class AddReminderDropdownComponent implements OnInit {

  @Input() prospect!: Prospect;

  formDate = new FormControl(new Date);
  formPriority = new FormControl(1);
  formDescription = new FormControl("");

  constructor(
    private readonly remindersService: RemindersService,
    private readonly eventsService: EventsService
  ) { }

  ngOnInit(): void {
  }

  onCreateReminder() {
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

    this.remindersService.create({
      date: this.formDate.value,
      priority: this.formPriority.value,
      done: false,
      description: this.formDescription.value,
      pm: pm,
      prospect: this.prospect
    });

    this.eventsService.create({
      type: EventType.ADD_REMINDER,
      prospect: this.prospect,
      pm: pm,
      date: new Date,
      description: EventDescriptionType.ADD_REMINDER
    })
    console.log("Reminder created / ATTENTION: implement current pm")
  }
}
