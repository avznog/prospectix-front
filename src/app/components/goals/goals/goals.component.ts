import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoalTemplate } from 'src/app/models/goal-template.model';
import { Goal } from 'src/app/models/goal.model';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { GoalTemplatesService } from 'src/app/services/goal-templates/goal-templates.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  constructor(
    public readonly goalTemplatesService: GoalTemplatesService,
    public readonly goalsService: GoalsService,
    public readonly pmService: ProjectManagersService
  ) { }

  ngOnInit(): void {
  }

  onChangeDisabledTemplate(goalTemplate: KeyValue<number, GoalTemplate>) {
    this.goalTemplatesService.toggleDisabled(goalTemplate);
    this.pmService.toggleDisabledPmGoalsTemplate(goalTemplate)
  }

  toggleDisableGoal(pm: ProjectManager, goal: Goal) {
    this.pmService.toggleDisableGoal(pm, goal);
    this.goalsService.updateDisable(pm, goal, { disabled: goal.disabled})
  }

  // ? order by id
  asIsOrder() {
    return 1;
  }

  onChangeGoalValue(pm: ProjectManager, goal: Goal, value: any) {
    this.goalsService.udpateValue(pm, goal, { value: value.target.value})
  }

  onChangeImportant(goalTemplate: KeyValue<number, GoalTemplate>) {
    this.goalTemplatesService.toggleImportant(goalTemplate.key, { important: !goalTemplate.value.important });
  }
}
