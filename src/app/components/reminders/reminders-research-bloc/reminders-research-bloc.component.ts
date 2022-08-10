import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { ResearchParamsReminder } from 'src/app/models/research-params-reminder.model';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders-research-bloc',
  templateUrl: './reminders-research-bloc.component.html',
  styleUrls: ['./reminders-research-bloc.component.scss']
})
export class RemindersResearchBlocComponent implements OnInit {

  @Input() researchParamsReminder!: ResearchParamsReminder;

  @Output() updateResearchParamsReminderEvent = new EventEmitter<ResearchParamsReminder>();
  
  formKeyword = new FormControl("");
  formOldOrNew = new FormControl("new");
  formDone = new FormControl("");
  formOrderByPriority = new FormControl("");
  formPriority = new FormControl(0);
  formDate = new FormControl(Date);
  formDateDown = new FormControl(Date);
  formDateUp = new FormControl(Date);

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onEditOrderByPriority() : void {
    console.log(this.formOrderByPriority.value)
    this.updateResearchParamsReminder({
      ...this.researchParamsReminder,
      orderByPriority: this.formOrderByPriority.value ? 'true' : 'false'
    });
  }

  onEditPriority() : void {
    console.log(this.formPriority.value)
    this.updateResearchParamsReminder({
      ...this.researchParamsReminder,
      priority: this.formPriority.value
    });
  }

  onEditDate() : void {
    console.log(this.formDate.value)
    if(this.formDate.value != "")
      this.updateResearchParamsReminder({
        ...this.researchParamsReminder,
        date: `${this.formDate.value}T22:00:00.000Z`
      });
    else this.updateResearchParamsReminder({
      ...this.researchParamsReminder,
      date: ""
    });
  }

  onEditDateDown() : void {
    console.log(this.formDateDown.value)
  }

  onEditDateUp() : void {
    console.log(this.formDateUp.value)
  }

  onEditDone() : void {
    console.log(this.formDone.value)
    this.updateResearchParamsReminder({
      ...this.researchParamsReminder,
      done: this.formDone.value
    })
  }

  onEditOldOrNew() : void {
    console.log(this.formOldOrNew.value)
    this.updateResearchParamsReminder({
      ...this.researchParamsReminder,
      oldOrNew: this.formOldOrNew.value
    });
  }

  onEditKeyword() : void {
    console.log(this.formKeyword.value)
    this.updateResearchParamsReminder({
      ...this.researchParamsReminder,
      keyword: this.formKeyword.value
    });
  }

  updateResearchParamsReminder(value: ResearchParamsReminder) {
    this.updateResearchParamsReminderEvent.emit(value);
  }

}
