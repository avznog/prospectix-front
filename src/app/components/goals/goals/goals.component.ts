import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { GoalTemplate } from 'src/app/models/goal-template.model';
import { Goal } from 'src/app/models/goal.model';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { GoalTemplatesService } from 'src/app/services/goal-templates/goal-templates.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';
import { ActionProspectComponent } from '../../common/action-prospect/action-prospect.component';
import { AddGoalTemplateComponent } from '../add-goal-template/add-goal-template.component';
import { EditGoalTemplateComponent } from '../edit-goal-template/edit-goal-template.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  constructor(
    public readonly goalTemplatesService: GoalTemplatesService,
    public readonly goalsService: GoalsService,
    public readonly pmService: ProjectManagersService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.ngxSmartModalService.create('add-goal-template', AddGoalTemplateComponent);
    this.ngxSmartModalService.create('action-prospect', ActionProspectComponent);
    this.ngxSmartModalService.create('edit-goal-template', EditGoalTemplateComponent);
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
}
