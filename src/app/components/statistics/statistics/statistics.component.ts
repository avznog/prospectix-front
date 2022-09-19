import { Component, OnInit } from '@angular/core';
import { endOfWeek, startOfWeek } from 'date-fns';
import { StatHistoryService } from 'src/app/services/stat-history/stat-history.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  today = new Date();
  startOfWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  endOfWeek = endOfWeek(new Date(), { weekStartsOn: 1 })  ;
  constructor(
    public statisticsService: StatisticsService,
    public readonly statsHistoryService: StatHistoryService
  ) { }

  ngOnInit(): void {
  }

}
