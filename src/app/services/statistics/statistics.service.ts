import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateStatisticDto } from 'src/app/dto/statistics/update-statistic.dto';
import { Statistic } from 'src/app/models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  statistic: Statistic = {} as Statistic;
  constructor(
    private http: HttpClient
  ) {
    this.findMyStats().subscribe(statistic => this.statistic = statistic);
   }

  findMyStats() {
    return this.http.get<Statistic>(`statistics/my-stats`);
  }

  update(updateStatisticDto: UpdateStatisticDto) {
    return this.http.patch<Statistic>(`statistics/${this.statistic.id}`, updateStatisticDto).subscribe(() => this.statistic = { ...this.statistic, ...updateStatisticDto });
  }
}
