import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-each-goal',
  templateUrl: './each-goal-dashboard.component.html',
  styleUrls: ['./each-goal-dashboard.component.scss']
})
export class EachGoalDashboardComponent implements OnInit {
  @Input() goal!: Goal;
  constructor() { }

  ngOnInit(): void {
  }

}
