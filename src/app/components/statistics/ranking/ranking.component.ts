import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  dateDown: string = new Date(this.statisticsService.startDateForChartsInterval).toISOString();
  dateUp: string = new Date().toISOString();
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
    this.statisticsService.updateRankingChartsByDate({ dateDown: new Date(this.dateDown == '' ? this.statisticsService.startDateForChartsInterval : this.dateDown), dateUp: (this.dateUp == "") ? new Date() : new Date(this.dateUp) })
  }

  onClickToday() {
    this.dateUp = new Date().toISOString();
    this.onChangeDate();
  }
}
