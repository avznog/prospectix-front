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
  constructor(
    private readonly remindersService: RemindersService
  ) { }

  ngOnInit(): void {
    this.remindersService.findAll()
      .subscribe({
        next: (data) => {
          this.reminders = this.orderByPriority ? data.sort( (a: Reminder, b: Reminder) => (a.priority - b.priority)) : data;
         for(let reminder of data) {
          console.log(data)
          this.prospects.push(reminder.prospect);
         } 
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  updateOrderByPriority(newOrderByPriority: boolean) {
    this.orderByPriority = newOrderByPriority;
    this.reminders = this.orderByPriority ? this.reminders.sort( (a: Reminder, b: Reminder) => (a.priority - b.priority)) : this.reminders.sort((a: Reminder, b: Reminder) => (a.id - b.id));
    console.log("ordre by priority changed to " + this.orderByPriority);
  }

  updatePriority(newPriority: number) {
    console.log(newPriority)
    this.priority = newPriority;
    this.reminders = this.reminders.filter((reminder) => reminder.priority === newPriority);
  }
}
