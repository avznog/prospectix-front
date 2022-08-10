import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reminder } from 'src/app/models/reminder.model';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-each-reminder',
  templateUrl: './each-reminder.component.html',
  styleUrls: ['./each-reminder.component.scss']
})
export class EachReminderComponent implements OnInit {

  @Input() reminder!: Reminder;
  constructor(
    private readonly remindersService: RemindersService
  ) { }

  ngOnInit(): void {
  }

  onDeleteReminder() : Subscription {
    console.log("reminder deleted");
    return this.remindersService.deleteReminder(this.reminder.id);
  }

  onMarkReminderDone() : Subscription {
    console.log("reminder marked done");
    return this.remindersService.markDone(this.reminder.id);
  }

  onMarkReminderUndone() : Subscription {
    console.log("reminder marked undone");
    return this.remindersService.markUndone(this.reminder.id);
  }
}
