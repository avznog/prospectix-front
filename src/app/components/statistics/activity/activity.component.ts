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
    this.statisticsService.countAllCalls({ dateDown: new Date(this.statisticsService.startDateForChartsInterval), dateUp: new Date(this.statisticsService.endDateForChartsInterval) })
    this.statisticsService.countAllCallsForEveryOne();
    this.statisticsService.countAllMeetingsForEveryOne()
  }

  ngOnInit(): void {
  }

}
