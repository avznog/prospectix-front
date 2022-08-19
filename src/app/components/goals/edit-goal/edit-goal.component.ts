import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss']
})
export class EditGoalComponent implements OnInit {

  title: string = "";
  description: string = "";
  deadline: Date = new Date;
  isCyclic: boolean = true;
  totalSteps: number = Number();

  constructor() { }

  ngOnInit(): void {
  }


}
