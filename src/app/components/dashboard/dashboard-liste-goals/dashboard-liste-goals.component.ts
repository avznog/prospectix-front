import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-dashboard-liste-goals',
  templateUrl: './dashboard-liste-goals.component.html',
  styleUrls: ['./dashboard-liste-goals.component.scss']
})
export class DashboardListeGoalsComponent implements OnInit {

  constructor (
    public goalsService: GoalsService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
