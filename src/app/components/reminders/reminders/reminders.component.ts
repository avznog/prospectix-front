import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { ResearchParamsReminder } from 'src/app/models/research-params-reminder.model';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  reminders!: Reminder[];
  researchParamsReminder: ResearchParamsReminder = {
    take: 2,
    skip: 0,
    done: "false",
    oldOrNew: "new",
    keyword: "",
  }

  constructor(
    private readonly remindersService: RemindersService
  ) { }

  ngOnInit(): void {
   this.remindersService.findAllPaginated(this.researchParamsReminder)
    .subscribe({
      next: (data) => {
        this.reminders = data;
        console.log("ngoninit")
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  pageUp() {
    this.updateReminders({
      ...this.researchParamsReminder,
      skip: this.researchParamsReminder.skip! + 2
    });
  }

  pageDown() {
    this.updateReminders({
      ...this.researchParamsReminder,
      skip: this.researchParamsReminder.skip! - 2
    });
  }

  updateReminders(researchParamsReminder: ResearchParamsReminder) {
    this.researchParamsReminder = researchParamsReminder;
    this.remindersService.findAllPaginated(researchParamsReminder)
      .subscribe({
        next: (data) => {
          this.reminders = data;
          console.log(this.reminders)
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  updateResearchParamsReminder(newParams: ResearchParamsReminder) {
    this.researchParamsReminder = newParams;
    this.updateReminders(this.researchParamsReminder);
  } 
 }
