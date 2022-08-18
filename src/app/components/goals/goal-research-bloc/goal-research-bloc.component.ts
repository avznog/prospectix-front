import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';

@Component({
  selector: 'app-goal-research-bloc',
  templateUrl: './goal-research-bloc.component.html',
  styleUrls: ['./goal-research-bloc.component.scss']
})
export class GoalResearchBlocComponent implements OnInit {

  formKeyword = new FormControl("")
  formPm = new FormControl("")
  constructor(
    public pmService: ProjectManagersService,
    private readonly goalsService: GoalsService
  ) { }

  ngOnInit(): void {
  }

  onEditKeyword() {
    setTimeout(() => {
      this.goalsService.resetSearch({
        ...this.goalsService.researchParamsGoals,
        keyword: this.formKeyword.value
      });
    }, 200);
  }

  onEditPm() {
    this.goalsService.resetSearch({
      ...this.goalsService.researchParamsGoals,
      pseudo: this.formPm.value
    });
  }

}
