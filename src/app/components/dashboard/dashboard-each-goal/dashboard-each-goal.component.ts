import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-dashboard-each-goal',
  templateUrl: './dashboard-each-goal.component.html',
  styleUrls: ['./dashboard-each-goal.component.scss']
})
export class DashboardEachGoalComponent implements OnInit {
  @Input() goal!: Goal;
  constructor() { }

  ngOnInit(): void {
  }

}
