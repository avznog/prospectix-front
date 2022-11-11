import { Component, Input, OnInit } from '@angular/core';
import { GoalTemplate } from 'src/app/models/goal-template.model';
import { GoalTemplatesService } from 'src/app/services/goal-templates/goal-templates.service';

@Component({
  selector: 'app-delete-goal-template',
  templateUrl: './delete-goal-template.component.html',
  styleUrls: ['./delete-goal-template.component.scss']
})
export class DeleteGoalTemplateComponent implements OnInit {

  @Input() goalTemplate!: GoalTemplate

  constructor(
    private readonly goalTemplatesService: GoalTemplatesService
  ) { }

  ngOnInit(): void {
  }

  onDeleteGoalTemplate() {
    this.goalTemplatesService.delete(this.goalTemplate.id);
  }

}
