import { Component, Input, OnInit } from '@angular/core';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-reminders-liste-prospect',
  templateUrl: './reminders-liste-prospect.component.html',
  styleUrls: ['./reminders-liste-prospect.component.scss']
})
export class RemindersListeProspectComponent implements OnInit {
  constructor(
    public remindersService: RemindersService
  ) { }

  ngOnInit(): void {
  }

}
