import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-dashboard-liste-reminders',
  templateUrl: './dashboard-liste-reminders.component.html',
  styleUrls: ['./dashboard-liste-reminders.component.scss']
})
export class DashboardListeRemindersComponent implements OnInit {

  constructor(
    public remindersService: RemindersService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
