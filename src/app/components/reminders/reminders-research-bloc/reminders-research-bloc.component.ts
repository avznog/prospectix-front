import { Component, OnInit } from '@angular/core';

import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders-research-bloc',
  templateUrl: './reminders-research-bloc.component.html',
  styleUrls: ['./reminders-research-bloc.component.scss']
})
export class RemindersResearchBlocComponent implements OnInit {

  keyword: string = "";
  oldOrNew: string = "new";
  done: string = "";
  orderByPriority: string = "";
  priority: number = 0;
  date: Date = new Date;
  dateDown: Date = new Date;
  dateUp: Date = new Date;

  constructor(
    private remindersService: RemindersService
  ) { }

  ngOnInit(): void {
  }

  onEditOrderByPriority() : void {
    
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      orderByPriority: this.orderByPriority ? 'true' : 'false'
    });
  }

  onEditPriority() : void {
    console.log(this.priority)
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      priority: this.priority
    });
  }

  onEditDate() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      date: this.date ? `${this.date}T22:00:00:000Z` : ""
    })
  }

  onEditDateDown() : void {
  }

  onEditDateUp() : void {
  }

  onEditDone() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      done: this.done
    })
  }

  onEditOldOrNew() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      oldOrNew: this.oldOrNew
    });
  }

  onEditKeyword() : void {
    setTimeout(() => {
      this.remindersService.resetSearch({
        ...this.remindersService.researchParamsReminder,
        keyword: this.keyword
      });
    }, 200);
  }
}
