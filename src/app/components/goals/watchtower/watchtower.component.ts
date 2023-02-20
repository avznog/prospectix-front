import { Component, OnInit } from '@angular/core';
import { GoalTemplatesService } from 'src/app/services/goal-templates/goal-templates.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-watchtower',
  templateUrl: './watchtower.component.html',
  styleUrls: ['./watchtower.component.scss']
})
export class WatchtowerComponent implements OnInit {

  weeks: {dateDown: Date, dateUp: Date}[] = []
  interv: {dateDown: Date, dateUp: Date} | undefined = { dateDown: new Date(), dateUp: new Date() }
  constructor(
    public readonly pmService: ProjectManagersService,
    public readonly statisticsService: StatisticsService,
    public readonly goalTemplatesService: GoalTemplatesService
  ) { }

  ngOnInit(): void {
    this.statisticsService.countWeeklyAllCalls();
    this.statisticsService.countWeeklyAllMeetings();
    this.interv = {dateDown: this.getMonday(new Date()), dateUp: new Date()};
    this.statisticsService.countAllCallsByWeeksForWatchtower({ dateDown: this.interv.dateDown, dateUp: this.interv.dateUp })
    this.statisticsService.countAllMeetingsByWeeksForWatchtower({ dateDown: this.interv.dateDown, dateUp: this.interv.dateUp })
    this.getWeeks()
    this.interv = undefined;
  }

  thisWeek() {
    this.interv = {dateDown: this.getMonday(new Date()), dateUp: new Date()};
    this.statisticsService.countAllCallsByWeeksForWatchtower({ dateDown: this.interv.dateDown, dateUp: this.interv.dateUp })
    this.statisticsService.countAllMeetingsByWeeksForWatchtower({ dateDown: this.interv.dateDown, dateUp: this.interv.dateUp })
    this.interv = undefined;
  }

  getMonday(today: Date) {
    //  ? getting the monday of the week
    // const monday = new Date(today.setDate(firstd));
    const date = new Date(today);
    const day = date.getDay(); // 👉️ get day of week
    // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(new Date(date.setDate(diff)).setHours(1,0,0,0));
  }

  getWeeks() {
    this.weeks = [];
    this.weeks.pop();
    let firstDate = this.getMonday(new Date(this.statisticsService.startDateForChartsInterval));
    while(firstDate < new Date()) {
      const monday = new Date(firstDate);
      const sunday = new Date(new Date(firstDate).setDate(firstDate.getDate() + 6));
      monday.setHours(1,0,0,0)
      sunday.setHours(23,59,59,999)
      this.weeks.push({dateDown: monday, dateUp: sunday})
      firstDate = new Date(firstDate.setDate(firstDate.getDate() + 7))
    }
    this.weeks.sort(interval => +interval.dateDown + +interval.dateUp)
  }

  setH() {
    this.interv && (this.interv.dateDown = new Date(this.interv.dateDown.setHours(1,0,0,0)));
  }
}
