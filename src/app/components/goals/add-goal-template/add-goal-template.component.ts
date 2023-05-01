import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DataThemeService } from 'src/app/services/common/data-theme.service';
import { GoalTemplatesService } from 'src/app/services/goal-templates/goal-templates.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal-template.component.html',
  styleUrls: ['./add-goal-template.component.scss']
})
export class AddGoalTemplateComponent implements OnInit {

  name: string = "";
  description: string = "";
  default: number = 0;
  disabled: boolean = false;

  constructor(
    private readonly goalTemplatesService: GoalTemplatesService,
    private readonly ngxSmartModalService: NgxSmartModalService,
    public readonly dataThemeService: DataThemeService
  ) { }

  ngOnInit(): void {
  }

  onAddTemplateGoal() {
    this.goalTemplatesService.create({
      name: this.name,
      description: this.description,
      default: this.default,
      disabled: this.disabled,
    });
    this.ngxSmartModalService.closeAll();
  }
}
