import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalsService } from '../services/goals.service';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.scss']
})
export class CreateGoalComponent implements OnInit {
  createGoalForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly goalsService: GoalsService
  ) { }

  ngOnInit(): void {
    this.createGoalForm = this.formBuilder.group({
      title: ["", Validators.required],
      pmPseudo: ["", Validators.required],
      description: [""],
      deadline: [Date, Validators.required],
      isCyclic: [true, Validators.required],
      totalSteps: [0, Validators.required]
    })
  }

  createGoal() {
    console.log(this.createGoalForm.value);
    this.goalsService.createGoal(this.createGoalForm.value);
  }

}
