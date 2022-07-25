import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-each-goal',
  templateUrl: './each-goal.component.html',
  styleUrls: ['./each-goal.component.scss']
})
export class EachGoalComponent implements OnInit {
  @Input() goal!: Goal;
  constructor() { }

  ngOnInit(): void {
  }

}
