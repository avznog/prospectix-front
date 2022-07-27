import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  goals!: Goal[];

  constructor(
    private goalsService: GoalsService
  ) { }

  ngOnInit(): void {
    this.goalsService.findAll()
      .subscribe({
        next: (data) => {
          this.goals = data;
          console.log(data)
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

}
