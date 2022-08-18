import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { Goal } from '../../../models/goal.model';

@Component({
  selector: 'app-liste-goals',
  templateUrl: './liste-goals.component.html',
  styleUrls: ['./liste-goals.component.scss'],
})
export class ListeGoalsComponent implements OnInit {

  // @Input() goals!: Goal[];
  // @Output() updateGoalToEditUpEvent = new EventEmitter<number>();

  constructor(
    public goalsService: GoalsService
  ){}

  ngOnInit(): void {
  }


  deleteGoal(goal: Goal) : Subscription {
    return this.goalsService.deleteGoal(goal.id);
  }

}
