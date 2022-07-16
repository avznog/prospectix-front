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

  @Input() goal!: Goal;
  @Input() goalToEdit!: number;
  @Output() updateGoalToEditEvent = new EventEmitter<number>();

  formEditGoal!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly goalsService: GoalsService
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

  editFormGoal() {
    
    this.goalsService.editGoal({
      ...this.formEditGoal.value,
      id: this.goalToEdit
    });
    this.updateGoalToEdit(-1);
  }

  onCancelEditGoal() {
    this.updateGoalToEdit(-1);
  }


  updateGoalToEdit(value: number) {
    this.updateGoalToEditEvent.emit(value);
  }


}
