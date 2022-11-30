import { Component, OnInit } from '@angular/core';
import { GoalTemplatesService } from 'src/app/services/goal-templates/goal-templates.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-watchtower',
  templateUrl: './watchtower.component.html',
  styleUrls: ['./watchtower.component.scss']
})
export class WatchtowerComponent implements OnInit {

  constructor(
    public readonly pmService: ProjectManagersService,
    public readonly statisticsService: StatisticsService,
    public readonly goalTemplatesService: GoalTemplatesService  
  ) { }

  ngOnInit(): void {
    this.statisticsService.countWeeklyAllCalls();
    this.statisticsService.countWeeklyAllMeetings();
  }

}
