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
  @Input() remindersDone!: boolean;
  @Input() futureReminders!: boolean;
  @Input() previousReminders!: boolean;
  @Output() updateOrderByPriorityEvent = new EventEmitter<boolean>();
  @Output() updatePriorityEvent = new EventEmitter<number>();
  @Output() updateDateEvent = new EventEmitter<Date>();
  @Output() updateRemindersDoneEvent = new EventEmitter<boolean>();
  @Output() updateFutureRemindersEvent = new EventEmitter<boolean>();
  @Output() updatePreviousRemindersEvent = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formSearchReminders = this.formBuilder.group({
      searchBar: ["", Validators.required],
      date: [Date, Validators.required],
      futureReminders: [true, Validators.required],
      previousReminders: [true, Validators.required],
      remindersDone: [false, Validators.required],
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

  onChangeRemindersDone() : void {
    this.updateRemindersDone(this.formSearchReminders.value["remindersDone"]);
  }

  onChangeFutureReminders() : void {
    this.updateFutureReminders(this.formSearchReminders.value["futureReminders"]);
  }

  onChangePreviousReminders() : void {
    this.updatePreviousReminders(this.formSearchReminders.value["previousReminders"]);
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

  updateRemindersDone(value: boolean) {
    this.updateRemindersDoneEvent.emit(value);
  }

  updateFutureReminders(value: boolean) {
    this.updateFutureRemindersEvent.emit(value);
  }

  updatePreviousReminders(value: boolean) {
    this.updatePreviousRemindersEvent.emit(value);
  }

}
