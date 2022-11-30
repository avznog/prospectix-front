import { Component, Input, OnInit } from '@angular/core';
import { GoalTemplate } from 'src/app/models/goal-template.model';
import { GoalTemplatesService } from 'src/app/services/goal-templates/goal-templates.service';

@Component({
  selector: 'app-edit-goal-template',
  templateUrl: './edit-goal-template.component.html',
  styleUrls: ['./edit-goal-template.component.scss']
})
export class EditGoalTemplateComponent implements OnInit {

  @Input() goalTemplate!: GoalTemplate

  name: string = "";
  description: string = "";
  default: number = 0;

  constructor(
    private readonly goalTemplatesService: GoalTemplatesService
  ) { }

  ngOnInit(): void {
    this.name = this.goalTemplate.name;
    this.description = this.goalTemplate.description;
    this.default = this.goalTemplate.default;
  }

  onEditTemplateGoal() {
    this.goalTemplatesService.udpate(this.goalTemplate.id,
      {
        name: this.name,
        description: this.description,
        default: this.default
      })
  }

}
