import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Goal } from 'src/app/models/goal.model';
import { GoalsService } from '../../../services/goals/goals.service';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss']
})
export class EditGoalComponent implements OnInit {


  formEditGoal!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formEditGoal = this.formBuilder.group({
      title: [""],
      description: [""],
      deadline: [Date],
      isCyclic: [false],
      totalSteps: [0]
    });
    
  }


}
