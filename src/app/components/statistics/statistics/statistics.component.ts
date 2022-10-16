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
  }

  ngOnInit(): void {
    this.statisticsService.currentPage = localStorage.getItem("statsRoute") ?? "my-stats";
  }
  
  onChangeStatPage(newPage: string) {
    this.statisticsService.currentPage = newPage;
    localStorage.setItem("statsRoute",newPage);
  }
}
