import { Component, OnInit } from '@angular/core';

import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders-research-bloc',
  templateUrl: './reminders-research-bloc.component.html',
  styleUrls: ['./reminders-research-bloc.component.scss']
})
export class RemindersResearchBlocComponent implements OnInit {

  done: string | boolean = "";
  priority: number = 0;

  constructor(
    private remindersService: RemindersService
  ) { }

  ngOnInit(): void {
    this.done = this.remindersService.researchParamsReminder.done == "true" || this.remindersService.researchParamsReminder.done == true ? true: false
  }

  onEditPriority() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      priority: this.priority
    });
  }

  onEditDone() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      done: this.done
    })
  }
}
