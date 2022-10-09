import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  constructor(
    private readonly statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.statisticsService.countAllCalls({ dateDown: new Date("2022-07-01T00:00:00.000Z"), dateUp: new Date() })
    this.statisticsService.countAllReminders({ dateDown: new Date("2022-07-01T00:00:00.000Z"), dateUp: new Date() })
    this.statisticsService.countAllMeetings({ dateDown: new Date("2022-07-01T00:00:00.000Z"), dateUp: new Date() })
    this.statisticsService.countAllSentEmails({ dateDown: new Date("2022-07-01T00:00:00.000Z"), dateUp: new Date() })
  }

}
