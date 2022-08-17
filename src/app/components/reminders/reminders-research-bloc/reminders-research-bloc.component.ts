import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders-research-bloc',
  templateUrl: './reminders-research-bloc.component.html',
  styleUrls: ['./reminders-research-bloc.component.scss']
})
export class RemindersResearchBlocComponent implements OnInit {
  
  formKeyword = new FormControl("");
  formOldOrNew = new FormControl("new");
  formDone = new FormControl("");
  formOrderByPriority = new FormControl("");
  formPriority = new FormControl(0);
  formDate = new FormControl(Date);
  formDateDown = new FormControl(Date);
  formDateUp = new FormControl(Date);

  constructor(
    private remindersService: RemindersService
  ) { }

  ngOnInit(): void {
  }

  onEditOrderByPriority() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      orderByPriority: this.formOrderByPriority.value ? 'true' : 'false'
    });
  }

  onEditPriority() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      priority: this.formPriority.value
    });
  }

  onEditDate() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      date: this.formDate.value!= "" ? `${this.formDate.value}T22:00:00:000Z` : ""
    })
  }

  onEditDateDown() : void {
  }

  onEditDateUp() : void {
  }

  onEditDone() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      done: this.formDone.value
    })
  }

  onEditOldOrNew() : void {
    this.remindersService.resetSearch({
      ...this.remindersService.researchParamsReminder,
      oldOrNew: this.formOldOrNew.value
    });
  }

  onEditKeyword() : void {
    setTimeout(() => {
      this.remindersService.resetSearch({
        ...this.remindersService.researchParamsReminder,
        keyword: this.formKeyword.value
      });
    }, 200);
  }
}
