import { Component, OnInit } from '@angular/core';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';
import { GoalsService } from '../../../services/goals/goals.service';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.scss']
})
export class CreateGoalComponent implements OnInit {

  choosingPm = false;
  title: string = "";
  pmPseudo: string = "";
  description: string = "";
  deadline: Date = new Date;
  isCyclic: boolean = true;
  totalSteps: number = Number();

  constructor(
    private readonly goalsService: GoalsService,
    public readonly pmService: ProjectManagersService
  ) { }

  ngOnInit(): void {

  }

  createGoal() {
    this.goalsService.createForPm({
      isCyclic: this.isCyclic,
      deadline: this.deadline,
      title: this.title,
      totalSteps: this.totalSteps,
      currentStep: 0,
      description: this.description
    },
    this.pmPseudo
    );
  }
}
