import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-liste-goals',
  templateUrl: './liste-goals.component.html',
  styleUrls: ['./liste-goals.component.scss']
})
export class ListeGoalsComponent implements OnInit {

  goals!: Goal[];
  constructor(
    private readonly goalsService: GoalsService
  ) { }

  ngOnInit(): void {
    this.goalsService.findAllByCurrentPm()
      .subscribe({
        next: (data) => {
          this.goals = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

}
