import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reminders-research-bloc',
  templateUrl: './reminders-research-bloc.component.html',
  styleUrls: ['./reminders-research-bloc.component.scss']
})
export class RemindersResearchBlocComponent implements OnInit {
  formSearchReminders!: FormGroup;
  @Input() orderByPriority!: boolean;
  @Input() priority!: number;
  @Input() date!: Date;
  @Output() updateOrderByPriorityEvent = new EventEmitter<boolean>();
  @Output() updatePriorityEvent = new EventEmitter<number>();
  @Output() updateDateEvent = new EventEmitter<Date>();
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formSearchReminders = this.formBuilder.group({
      searchBar: ["", Validators.required],
      date: [Date, Validators.required],
      futureReminders: [true, Validators.required],
      oldReminders: [true, Validators.required],
      orderByPriority: [false, Validators.required],
      priority: [0, Validators.required]
    });
  }

  onOrderPriorityChange() : void {
    this.updateOrderByPriority(this.formSearchReminders.value["orderByPriority"]);
  }

  onPriorityChange() : void {
    this.updatePriority(this.formSearchReminders.value["priority"]);
  }

  onDateChange() : void {
    this.updateDate(this.formSearchReminders.value["date"]);
  }

  updateOrderByPriority(value: boolean) {
    this.updateOrderByPriorityEvent.emit(value);
  }

  updatePriority(value: number) {
    this.updatePriorityEvent.emit(value);
  }

  updateDate(value: Date) {
    this.updateDateEvent.emit(value);
  }

}
