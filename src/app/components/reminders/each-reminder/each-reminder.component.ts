import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { Reminder } from 'src/app/models/reminder.model';
import { EventsService } from 'src/app/services/events/events.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-each-reminder',
  templateUrl: './each-reminder.component.html',
  styleUrls: ['./each-reminder.component.scss']
})
export class EachReminderComponent implements OnInit {

  @Input() reminder!: Reminder;
  constructor(
    private readonly remindersService: RemindersService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onDeleteReminder() : Subscription {
    console.log("reminder deleted");
    this.eventsService.create({
      type: EventType.DELETE_REMINDER,
      prospect: this.reminder.prospect,
      date: new Date,
      description: `${EventDescriptionType.DELETE_REMINDER} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.remindersService.deleteReminder(this.reminder.id);
  }

  onMarkReminderDone() : Subscription {
    console.log("reminder marked done");
    this.eventsService.create({
      type: EventType.DONE_REMINDER,
      prospect: this.reminder.prospect,
      date: new Date,
      description: `${EventDescriptionType.DONE_REMINDER} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.remindersService.markDone(this.reminder.id);
  }

  onMarkReminderUndone() : Subscription {
    console.log("reminder marked undone");
    return this.remindersService.markUndone(this.reminder.id);
  }
}
