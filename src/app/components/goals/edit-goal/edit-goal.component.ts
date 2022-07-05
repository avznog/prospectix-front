import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Goal } from 'src/app/models/goal.model';
import { GoalsService } from '../../../services/goals.service';

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
      id: [0],
      title: [""],
      description: [""],
      deadline: [Date],
      isCyclic: [false],
      totalSteps: [0]
    });
  }

  editFormGoal() {
    this.goalsService.editGoal(this.formEditGoal.value);
  }

}
