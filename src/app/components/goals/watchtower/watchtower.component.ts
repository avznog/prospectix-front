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

  dateDown: Date = new Date();
  dateUp: Date = new Date();
  constructor(
    public readonly pmService: ProjectManagersService,
    public readonly statisticsService: StatisticsService,
    public readonly goalTemplatesService: GoalTemplatesService
  ) { }

  ngOnInit(): void {
    this.statisticsService.countWeeklyAllCalls();
    this.statisticsService.countWeeklyAllMeetings();
    this.dateDown = this.getMonday();
    this.statisticsService.countAllCallsByWeeksForWatchtower({ dateDown: this.dateDown, dateUp: this.dateUp })
    this.statisticsService.countAllMeetingsByWeeksForWatchtower({ dateDown: this.dateDown, dateUp: this.dateUp })
  }

  onClickCurrentWeek() {
    this.dateDown = this.getMonday();
    this.dateUp = new Date();
    this.statisticsService.countAllCallsByWeeksForWatchtower({ dateDown: this.dateDown, dateUp: this.dateUp })
    this.statisticsService.countAllMeetingsByWeeksForWatchtower({ dateDown: this.dateDown, dateUp: this.dateUp })
  }

  onChangeDate() {
    this.statisticsService.countAllCallsByWeeksForWatchtower({dateDown: this.dateDown, dateUp: this.dateUp})
    this.statisticsService.countAllMeetingsByWeeksForWatchtower({ dateDown: this.dateDown, dateUp: this.dateUp })

  }

  getMonday() {
    const today = new Date();
    //  ? getting the monday of the week
    // const monday = new Date(today.setDate(firstd));
    const date = new Date(today);
    const day = date.getDay(); // 👉️ get day of week
    // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  }

}
