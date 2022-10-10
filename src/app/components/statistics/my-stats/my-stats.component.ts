import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-my-stats',
  templateUrl: './my-stats.component.html',
  styleUrls: ['./my-stats.component.scss']
})
export class MyStatsComponent implements OnInit {

  constructor(
    public readonly statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {

    // ! Weekly stats
    this.statisticsService.countWeeklyCallsForMe();
    this.statisticsService.countWeeklyMeetingsForMe();
    this.statisticsService.countWeeklyRemindersForMe();
    this.statisticsService.countWeeklyNegativeAnswersForMe();
    this.statisticsService.countWeeklySentEmailsForMe();
  }

}
