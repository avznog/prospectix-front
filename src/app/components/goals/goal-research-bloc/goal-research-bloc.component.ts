import { Component, OnInit } from '@angular/core';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';

@Component({
  selector: 'app-goal-research-bloc',
  templateUrl: './goal-research-bloc.component.html',
  styleUrls: ['./goal-research-bloc.component.scss']
})
export class GoalResearchBlocComponent implements OnInit {

  keyword: string = "";
  pm: string = "";
  constructor(
    public pmService: ProjectManagersService,
    private readonly goalsService: GoalsService
  ) { }

  ngOnInit(): void {
  }

  onEditKeyword() {
    this.goalsService.resetSearch({
      ...this.goalsService.researchParamsGoals,
      keyword: this.keyword
    });
  }

  onEditPm() {
    this.goalsService.resetSearch({
      ...this.goalsService.researchParamsGoals,
      pseudo: this.pm
    });
  }

}
