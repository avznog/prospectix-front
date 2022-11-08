import { Component, Input, OnInit } from '@angular/core';
import { Reminder } from 'src/app/models/reminder.model';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-edit-time-reminder',
  templateUrl: './edit-time-reminder.component.html',
  styleUrls: ['./edit-time-reminder.component.scss']
})
export class EditTimeReminderComponent implements OnInit {

  @Input() reminder!: Reminder;
  time: string = ""

  constructor(
    private readonly remindersService: RemindersService
  ) { }

  ngOnInit(): void {

  }

  onClickReminderChangeTime() {
    let date = new Date(this.reminder.date).setHours(+this.time.split(":")[0],+this.time.split(":")[1])
    this.remindersService.update(this.reminder.id, {
      date: new Date(date)
    });
  }
}
