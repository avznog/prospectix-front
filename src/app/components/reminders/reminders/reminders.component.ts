import { Component, OnInit } from '@angular/core';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  constructor(
    public readonly remindersService: RemindersService
  ) { }

  ngOnInit(): void {
    console.log(typeof(this.remindersService.researchParamsReminder.done))
  }

  pageUp() {
    this.remindersService.updateSearchParameters({
      ...this.remindersService.researchParamsReminder,
      skip: this.remindersService.researchParamsReminder.skip + 20
    });
  }

  pageDown() {
    this.remindersService.updateSearchParameters({
      ...this.remindersService.researchParamsReminder,
      skip: this.remindersService.researchParamsReminder.skip - 20
    });
  }
 }
