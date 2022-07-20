import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Goal } from '../../../models/goal.model';
import { GoalsService } from '../../../services/goals/goals.service';

@Component({
  selector: 'app-each-goal',
  templateUrl: './each-goal.component.html',
  styleUrls: ['./each-goal.component.scss']
})
export class EachGoalComponent implements OnInit {

  @Input() goal: Goal = {} as Goal;
  @Input() goalToEdit!: number;
  @Output() updateGoalToEditEvent = new EventEmitter<number>();

  constructor(
    private readonly goalsService: GoalsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  editGoal() : Subscription {
    this.updateGoalToEdit(this.goal.id);
    return null as unknown as Subscription;
  }

  deleteGoal() : Subscription {
    return this.goalsService.deleteGoal(this.goal.id);
  }


  updateGoalToEdit(value: number) {
    this.updateGoalToEditEvent.emit(value);
  }

}
