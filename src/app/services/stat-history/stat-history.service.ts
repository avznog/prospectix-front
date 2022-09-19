import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateStatsHistoryDto } from 'src/app/dto/stats-history/create-stats-history.dto';
import { StatsHistory } from 'src/app/models/stats-history.model';

@Injectable({
  providedIn: 'root'
})
export class StatHistoryService {

  statsHistory = new Map<number, StatsHistory>();

  constructor(
    private http: HttpClient
  ) {
    this.findAllForMe().subscribe(statsHistories => statsHistories.forEach(statsHistory => this.statsHistory.set(statsHistory.id, statsHistory)));
   }

  findAllForMe() {
    return this.http.get<StatsHistory[]>(`stats-history/for-me`);
  }

  create(createStatsHistoryDto: CreateStatsHistoryDto) {
    return this.http.post<StatsHistory>(`stats-history`, createStatsHistoryDto).subscribe(statsHistory => this.statsHistory.set(statsHistory.id, statsHistory));
  }
}
