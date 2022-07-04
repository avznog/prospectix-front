import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Goal } from 'src/app/models/goal.model';
import { GoalsService } from '../services/goals.service';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss']
})
export class EditGoalComponent implements OnInit {
  @Input() goal!: Goal;
  formEditGoal!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly goalsService: GoalsService
  ) { }

  ngOnInit(): void {
    this.formEditGoal = this.formBuilder.group({
      title: [this.goal.title],
      pmPseudo: [this.goal.pm.pseudo],
      description: [this.goal.description],
      deadline: [this.goal.deadline],
      isCyclic: [this.goal.isCyclic],
      totalSteps: [this.goal.totalSteps]
    });
  }

  editFormGoal() {
    this.goalsService.editGoal(this.formEditGoal.value);
  }

}
