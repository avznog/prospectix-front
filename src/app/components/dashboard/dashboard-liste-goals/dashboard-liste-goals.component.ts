import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-dashboard-liste-goals',
  templateUrl: './dashboard-liste-goals.component.html',
  styleUrls: ['./dashboard-liste-goals.component.scss']
})
export class DashboardListeGoalsComponent implements OnInit {

  @Input() goals!: Goal[];
  constructor() { }

  ngOnInit(): void {
  }

}
