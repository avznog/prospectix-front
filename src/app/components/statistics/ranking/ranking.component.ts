import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  dateDown: Date = new Date("2022-01-07T00:00:00.000Z");
  dateUp: Date = new Date();
  constructor(
    private readonly statisticsService: StatisticsService
  ) {
   }

  ngOnInit(): void {
    this.statisticsService.countAllCalls({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
    this.statisticsService.countAllReminders({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
    this.statisticsService.countAllMeetings({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
    this.statisticsService.countAllSentEmails({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
  }

  onChangeDate() {
  //   this.statisticsService.countAllCalls({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
  //   this.statisticsService.countAllReminders({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
  //   this.statisticsService.countAllMeetings({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
  //   this.statisticsService.countAllSentEmails({ dateDown: new Date(this.dateDown), dateUp: new Date(this.dateUp) })
  }

}
