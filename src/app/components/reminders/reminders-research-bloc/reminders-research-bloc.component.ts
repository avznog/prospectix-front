import { Component, OnInit } from '@angular/core';

import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders-research-bloc',
  templateUrl: './reminders-research-bloc.component.html',
  styleUrls: ['./reminders-research-bloc.component.scss']
})
export class RemindersResearchBlocComponent implements OnInit {

  done: boolean = false;
  keyword: string | null = null;
  priority: number | null = null;

  constructor(
    private remindersService: RemindersService
  ) { }

  ngOnInit(): void {
    this.done = this.remindersService.researchParamsReminder.done == 1 ? true : false;
    this.priority = Number(localStorage.getItem('reminders-priority')) ?? 0;
  }

  updateParameters() {
    localStorage.setItem('reminders-priority', this.priority?.toString() ?? '');
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      done: this.done ? 1 : 0,
      keyword: this.keyword != '' ? this.keyword : null,
      priority: this.priority == 0 ? null : this.priority,
    })
  }
}
