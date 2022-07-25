import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goal } from '../../../models/goal.model';

@Component({
  selector: 'app-liste-goals',
  templateUrl: './liste-goals.component.html',
  styleUrls: ['./liste-goals.component.scss'],
})
export class ListeGoalsComponent implements OnInit {

  @Input() goals!: Goal[];
  @Input() goalToEdit!: number;
  @Output() updateGoalToEditUpEvent = new EventEmitter<number>();

  ngOnInit(): void {
  }

  updateGoalToEdit(newGoalToEdit: number) {
    console.log("goal to edit edited" + newGoalToEdit)
    this.goalToEdit = newGoalToEdit;
    this.updateGoalToEditUp(this.goalToEdit);
  }

  updateGoalToEditUp(value: number) {
    this.updateGoalToEditUpEvent.emit(value);
  }



}
