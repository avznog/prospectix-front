import { Component, OnInit } from '@angular/core';
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
    private readonly goalTemplatesService: GoalTemplatesService
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
  }
}
