import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statsRoute: string = "my-stats";
  constructor(
    public readonly statisticsService: StatisticsService,

  ) {
  }

  ngOnInit(): void {
    this.statsRoute = localStorage.getItem("statsRoute") ?? "my-stats";
  }
  
  onChangeStatPage(newPage: string) {
    this.statsRoute = newPage;
    localStorage.setItem("statsRoute",newPage);
  }
}
