import { Component, Input, OnInit } from '@angular/core';
import { Reminder } from 'src/app/models/reminder.model';

@Component({
  selector: 'app-dashboard-each-reminder',
  templateUrl: './dashboard-each-reminder.component.html',
  styleUrls: ['./dashboard-each-reminder.component.scss']
})
export class DashboardEachReminderComponent implements OnInit {

  @Input() reminder!: Reminder;
  constructor() { }

  ngOnInit(): void {
  }

}
