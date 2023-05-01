import { Component, Input, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { GoalTemplate } from 'src/app/models/goal-template.model';
import { DataThemeService } from 'src/app/services/common/data-theme.service';
import { GoalTemplatesService } from 'src/app/services/goal-templates/goal-templates.service';

@Component({
  selector: 'app-edit-goal-template',
  templateUrl: './edit-goal-template.component.html',
  styleUrls: ['./edit-goal-template.component.scss']
})
export class EditGoalTemplateComponent implements OnInit {

  data: {
    goalTemplate?: GoalTemplate
  } = {};

  name: string = "";
  description: string = "";
  default: number = 0;

  constructor(
    private readonly goalTemplatesService: GoalTemplatesService,
    private readonly ngxSmartModalService: NgxSmartModalService,
    public readonly dataThemeService: DataThemeService
  ) { }

  ngOnInit(): void {
    this.data = this.ngxSmartModalService.getModalData('edit-goal-template');
    this.name = this.data.goalTemplate!.name;
    this.description = this.data.goalTemplate!.description;
    this.default = this.data.goalTemplate!.default;
  }

  onEditTemplateGoal() {
    this.goalTemplatesService.udpate(this.data.goalTemplate!.id,
      {
        name: this.name,
        description: this.description,
        default: this.default
      })

      this.ngxSmartModalService.closeAll();
  }

}
