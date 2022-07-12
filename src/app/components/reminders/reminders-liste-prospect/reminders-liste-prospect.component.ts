import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';

@Component({
  selector: 'app-reminders-liste-prospect',
  templateUrl: './reminders-liste-prospect.component.html',
  styleUrls: ['./reminders-liste-prospect.component.scss']
})
export class RemindersListeProspectComponent implements OnInit {
  @Input() prospects!: Prospect[];
  @Input() reminders!: Reminder[];
  @Input() priority!: number;
  @Input() remindersDone!: boolean;
  @Input() futureReminders!: boolean;
  @Input() previousReminders!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
