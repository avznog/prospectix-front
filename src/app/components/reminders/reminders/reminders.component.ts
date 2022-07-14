import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  prospects: Prospect[] = [];
  reminders: Reminder[] = [];
  orderByPriority!: boolean;
  priority!: number;
  date!: Date;
  remindersDone!: boolean;
  futureReminders!: boolean;
  previousReminders!: boolean;

  constructor(
    private readonly remindersService: RemindersService
  ) { }

  ngOnInit(): void {
    this.remindersService.findAll()
      .subscribe({
        next: (data) => {
          this.reminders = this.orderByPriority ? data.sort( (a: Reminder, b: Reminder) => (a.priority - b.priority)) : data;
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.remindersDone = false;
      this.futureReminders = true;
      this.previousReminders = true;
      this.priority = 0;
  }

  updateOrderByPriority(newOrderByPriority: boolean) {
    this.orderByPriority = newOrderByPriority;
    this.reminders = this.orderByPriority ? this.reminders.sort( (a: Reminder, b: Reminder) => (a.priority - b.priority)) : this.reminders.sort((a: Reminder, b: Reminder) => (a.id - b.id));
    console.log("ordre by priority changed to " + this.orderByPriority);
  }

  updatePriority(newPriority: number) {
    console.log(newPriority)
    this.priority = newPriority;
    this.reminders.filter((reminder) => reminder.priority === newPriority);
  }

  updateDate(newDate: Date) {
    // console.log(this.reminders[0].date.toString().split("T")[0] == newDate.toString() ? "true" : "false")
    console.log(this.reminders.filter((reminder) => reminder.date.toString().split("T")[0] == newDate.toString())); 
    this.date = newDate;
    // if(newDate)
    //   this.reminders.filter((reminder) => reminder.date.toString().split("T")[0] == newDate.toString()); 
  }

  updateRemindersDone(newRemindersDone: boolean) {
    console.log(newRemindersDone ? "display reminders done" : "display reminders not done yet");
    this.remindersDone = newRemindersDone;
  }

  updateFutureReminders(newFutureReminders: boolean) {
    console.log("display future reminders");
    this.futureReminders = newFutureReminders;
  }

  updatePreviousReminders(newPreviousReminders: boolean) {
    console.log("display previous reminders");
    this.previousReminders = newPreviousReminders;
  }

  updateReminders(newReminders: Reminder[]) {
    this.reminders = newReminders;
  }

 }
