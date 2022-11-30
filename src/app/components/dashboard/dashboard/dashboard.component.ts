import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public readonly pmService: ProjectManagersService,
    public readonly authService: AuthService,
    public readonly statisticsService: StatisticsService,
    public readonly goalsService: GoalsService
  ) { }

  ngOnInit(): void {
    this.goalsService.findAll()
  }

}
