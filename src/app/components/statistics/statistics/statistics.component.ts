import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  constructor(
    public readonly statisticsService: StatisticsService,

  ) {
    this.statisticsService.countAllCalls({ dateDown: new Date("2022-07-01T00:00:00.000Z"), dateUp: new Date() })
  }

  ngOnInit(): void {
  }
  

}
