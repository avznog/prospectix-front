import { Component, Input, OnInit } from '@angular/core';
import { Goal } from '../../../models/goal.model';
import { GoalsService } from '../../../services/goals/goals.service';

@Component({
  selector: 'app-liste-goals',
  templateUrl: './liste-goals.component.html',
  styleUrls: ['./liste-goals.component.scss'],
})
export class ListeGoalsComponent implements OnInit {
  goals!: Goal[];
  goal!: Goal;
  constructor(
    private readonly goalsService: GoalsService
  ) { }

  ngOnInit(): void {
    this.goalsService.findAllByCurrentPm()
      .subscribe({
        next: (data) => {
          this.goals = data;
          console.log(data)
        },
        error: (err) => {
          console.log(err)
        }
      })
  }



}
