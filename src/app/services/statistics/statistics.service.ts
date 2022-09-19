import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateStatisticDto } from 'src/app/dto/statistics/update-statistic.dto';
import { Statistic } from 'src/app/models/statistic.model';
import { StatHistoryService } from '../stat-history/stat-history.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  statistic: Statistic = {} as Statistic;
  constructor(
    private http: HttpClient,
    private readonly statHistoryService: StatHistoryService
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

  // Reseting the stats on the first day of the week and adding it in history
  checkAndResetWeek() {
    if(Math.abs((new Date().getDate() - new Date(this.statistic.lastReset).getDate())) > 6){
      this.statHistoryService.create({
        startDate: this.statistic.lastReset,
        endDate: new Date,
        totalCalls: this.statistic.totalCalls,
        totalMeetings: this.statistic.totalMeetings,
        totalReminders: this.statistic.totalReminders,
        totalNegativeAnswers: this.statistic.totalNegativeAnswers,
        totalSentEmails: this.statistic.totalSentEmails,
        weeklyCalls: this.statistic.weeklyCalls,
        weeklyMeetings: this.statistic.weeklyMeetings,
        weeklyReminders: this.statistic.weeklyReminders,
        weeklyNegativeAnswers: this.statistic.weeklyNegativeAnswers,
        weeklySentEmails: this.statistic.weeklySentEmails
      });
      console.log("stat reseted")
      this.update({
        weeklyCalls: 0,
        weeklyMeetings: 0,
        weeklyNegativeAnswers: 0,
        weeklyReminders: 0,
        weeklySentEmails: 0,
        lastReset: new Date()
      });
    }
  }
}
