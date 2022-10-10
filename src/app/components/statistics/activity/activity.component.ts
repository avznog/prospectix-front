import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor(
    private readonly statisticsService: StatisticsService
  ) { 
    this.statisticsService.countAllCalls({ dateDown: new Date("2022-01-07T00:00:00.000Z"), dateUp: new Date() })
    this.statisticsService.countAllCallsForEveryOne();
    this.statisticsService.countAllMeetingsForEveryOne()

  }

  ngOnInit(): void {
    // this.statisticsService.countAllCalls({ dateDown: new Date("2022-01-07T00:00:00.000Z"), dateUp: new Date() })
  }

}
