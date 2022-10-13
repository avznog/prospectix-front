import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  dateDown: string = new Date(this.statisticsService.startDateForChartsInterval).toISOString();
  dateUp: string = new Date(this.statisticsService.endDateForChartsInterval).toISOString();
  constructor(
    private readonly statisticsService: StatisticsService,
  ) {
   }

  ngOnInit(): void {
    this.statisticsService.countAllCalls({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
    this.statisticsService.countAllReminders({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
    this.statisticsService.countAllMeetings({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
    this.statisticsService.countAllSentEmails({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
  }

  onChangeDate() {
    this.statisticsService.updateRankingChartsByDate({ dateDown: new Date(this.dateDown == '' ? this.statisticsService.startDateForChartsInterval : this.dateDown), dateUp: new Date(this.dateUp == '' ? this.statisticsService.endDateForChartsInterval : this.dateUp) })
  }

  onClickToday() {
    this.dateUp = new Date(this.statisticsService.endDateForChartsInterval).toISOString();
    this.onChangeDate();
  }
}
