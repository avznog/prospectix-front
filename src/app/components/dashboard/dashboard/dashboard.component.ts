import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  goals!: Goal[];
  constructor(
    private goalsService: GoalsService
  ) { }

  ngOnInit(): void {
    // TODO : Must change to findForCurrentPm findForPm
    this.goalsService.findAll()
      .subscribe({
        next: (data) => {
          console.log(data)
          this.goals = data;
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

}
