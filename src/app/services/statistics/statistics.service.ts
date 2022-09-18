import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isToday, startOfWeek } from 'date-fns';
import { UpdateStatisticDto } from 'src/app/dto/statistics/update-statistic.dto';
import { Statistic } from 'src/app/models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  statistic: Statistic = {} as Statistic;
  constructor(
    private http: HttpClient,
  ) {
    this.findMyStats().subscribe(statistic => {
      this.statistic = statistic;
      this.checkAndResetWeek();
    });
   }

  findMyStats() {
    return this.http.get<Statistic>(`statistics/my-stats`);
  }

  update(updateStatisticDto: UpdateStatisticDto) {
    return this.http.patch<Statistic>(`statistics/${this.statistic.id}`, updateStatisticDto).subscribe(() => this.statistic = { ...this.statistic, ...updateStatisticDto });
  }

  // Reseting the stats on the first day of the week
  checkAndResetWeek() {
    if(isToday(startOfWeek(new Date(), { weekStartsOn: 1})) && !this.statistic.isReseted) {
      this.update({
        weeklyCalls: 0,
        weeklyMeetings: 0,
        weeklyNegativeAnswers: 0,
        weeklyReminders: 0,
        weeklySentEmails: 0,
        isReseted: true
      });
    } else if (!isToday(startOfWeek(new Date(), { weekStartsOn: 1})) && this.statistic.isReseted) {
      this.update({
        isReseted: false
      });
    }
  }
}
