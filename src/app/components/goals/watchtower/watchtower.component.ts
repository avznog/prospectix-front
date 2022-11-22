import { Component, OnInit } from '@angular/core';
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
    public readonly statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.statisticsService.countWeeklyAllCalls();
    this.statisticsService.countWeeklyAllMeetings();
  }

}
