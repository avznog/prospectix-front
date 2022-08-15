import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateGoalDto } from 'src/app/dto/goals/create-goal.dto';
import { Goal } from 'src/app/models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  editIsClicked!: boolean;
  constructor(
    private http: HttpClient
  ) { }

  findAll() : Observable<Goal[]> {
    return this.http.get<Goal[]>("http://localhost:3000/goals");
  }

  findAllByCurrentPm() : Observable<Goal[]> {
    return this.http.get<Goal[]>("http://localhost:3000/goals/by-current-pm");
  }

  createForPm(createGoalDto: CreateGoalDto, pseudoPm: string) : Subscription {
    createGoalDto.currentStep = 0;
    return this.http.post<Goal>(`http://localhost:3000/goals/for-pm/${pseudoPm}`, createGoalDto).subscribe();
  }

  createForCurrentPm(createGoalDto: CreateGoalDto) : Subscription {
    createGoalDto.currentStep = 0;
    return this.http.post<Goal>("http://localhost:3000/goals/for-current-pm", createGoalDto).subscribe();
  }

  editGoal(goal: Goal) : Subscription {
    return this.http.patch<Goal>(`http://localhost:3000/goals/${goal.id}`, goal).subscribe();
  }

  deleteGoal(id: number) : Subscription {
    return this.http.delete<Goal>(`http://localhost:3000/goals/${id}`).subscribe();
  }
}
