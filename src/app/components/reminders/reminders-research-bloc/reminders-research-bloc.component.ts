import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reminder } from 'src/app/models/reminder.model';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

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
  @Input() reminders!: Reminder[];
  @Input() remindersDateDown!: Date;
  @Input() remindersDateUp!: Date;
  @Output() updateOrderByPriorityEvent = new EventEmitter<boolean>();
  @Output() updatePriorityEvent = new EventEmitter<number>();
  @Output() updateDateEvent = new EventEmitter<Date>();
  @Output() updateRemindersDoneEvent = new EventEmitter<boolean>();
  @Output() updateFutureRemindersEvent = new EventEmitter<boolean>();
  @Output() updatePreviousRemindersEvent = new EventEmitter<boolean>();
  @Output() updateRemindersEvent = new EventEmitter<Reminder[]>();
  @Output() updateRemindersDateDownEvent = new EventEmitter<Date>();
  @Output() updateRemindersDateUpEvent = new EventEmitter<Date>();

  constructor(
    private formBuilder: FormBuilder,
    private readonly remindersServcice: RemindersService
  ) { }

  ngOnInit(): void {
    this.formSearchReminders = this.formBuilder.group({
      searchBar: ["", Validators.required],
      date: [Date, Validators.required],
      futureReminders: [true, Validators.required],
      previousReminders: [true, Validators.required],
      remindersDone: [false, Validators.required],
      orderByPriority: [false, Validators.required],
      priority: [0, Validators.required],
      dateDown: [Date, Validators.required],
      dateUp: [Date, Validators.required]
    });
  }

  onRemindersOrderPriorityChange() : void {
    this.updateOrderByPriority(this.formSearchReminders.value["orderByPriority"]);
  }

  onRemindersPriorityChange() : void {
    this.updatePriority(this.formSearchReminders.value["priority"]);
  }

  onRemindersDateChange() : void {
    this.updateDate(this.formSearchReminders.value["date"]);
  }

  onRemindersDateDownChange() : void {
    this.updateRemindersDateDown(this.formSearchReminders.value["dateDown"]);
  }

  onRemindersDateUpChange() : void {
    this.updateRemindersDateUp(this.formSearchReminders.value["dateUp"]);
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

  onRemindersEditSearchBar() : void {
    if(this.formSearchReminders.value["searchBar"] != ""){
      this.remindersServcice.findAllByKeyword(this.formSearchReminders.value["searchBar"])
      .subscribe({
        next: (data) => {
          console.log("reminders updated");
          this.updateReminders(data);
        },
        error: (err) => {
          console.log(err)
        }
      });
    } else {
      this.remindersServcice.findAll()
        .subscribe({
          next: (data) => {
            this.updateReminders(data);
          },
          error: (err) => {
            console.log(err)
          }
        })
    }
    
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

  updateReminders(value: Reminder[]) {
    this.updateRemindersEvent.emit(value);
  }

  updateRemindersDateDown(value: Date) {
    this.updateRemindersDateDownEvent.emit(value);
  }

  updateRemindersDateUp(value: Date) {
    this.updateRemindersDateUpEvent.emit(value);
  }

}
