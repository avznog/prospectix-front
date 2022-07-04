import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Goal } from '../../../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  editIsClicked!: boolean;
  constructor(
    private http: HttpClient
  ) { }

  findAllByCurrentPm() : Observable<Goal[]> {
    console.log("findallbycurrent")
    return this.http.get<Goal[]>("http://localhost:3000/goals/by-current-pm");
  }

  createGoal(goal: Goal) : Subscription{
    console.log("createGoal")
    goal.currentStep = 0;
    return this.http.post<Goal>("http://localhost:3000/goals", goal).subscribe();
  }

  editGoal(goal: Goal) : Subscription {
    console.log("editGoal (not create in the back yet)")
    return this.http.patch<Goal>(`http://localhost:3000/goals/${goal.id}`, goal).subscribe();
  }

  deleteGoal(id: number) : Subscription {
    console.log("deleteGoal (not created in the back yet)")
    return this.http.delete<Goal>(`http://localhost:3000/goals/${id}`).subscribe();
  }
}
