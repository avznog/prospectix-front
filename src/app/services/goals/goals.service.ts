import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateGoalDto } from 'src/app/dto/goals/create-goal.dto';
import { Goal } from 'src/app/models/goal.model';
import { ResearchParamsGoals } from 'src/app/models/research-params-goals.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  goals = new Map<number, Goal>();
  researchParamsGoals: ResearchParamsGoals = {
    take: 2,
    skip: 0,
    pseudo: '',
    keyword: ''
  }
  constructor(
    private http: HttpClient
  ) { 
    this.loadMore();
  }

  resetSearch(researchParamsGoals: ResearchParamsGoals) {
    this.goals.clear();
    this.updateSearchParameters({
      ...researchParamsGoals,
      skip: 0
    });
  }

  updateSearchParameters(researchParamsGoals: ResearchParamsGoals) {
    if(researchParamsGoals != this.researchParamsGoals)
      this.researchParamsGoals = researchParamsGoals;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();
      queryParameters = queryParameters.appendAll({
        "take": this.researchParamsGoals.take,
        "skip": this.researchParamsGoals.skip,
        "pseudo": this.researchParamsGoals.pseudo,
        "keyword": this.researchParamsGoals.keyword
      })
    this.http.get<Goal[]>(`goals/find-all-paginated/`, { params: queryParameters }).subscribe(goals => goals.forEach(goal => this.goals.set(goal.id, goal)));
  }

  createForPm(createGoalDto: CreateGoalDto, pseudoPm: string) : Subscription {
    createGoalDto.currentStep = 0;
    return this.http.post<Goal>(`goals/for-pm/${pseudoPm}`, createGoalDto).subscribe(goal => this.goals.set(goal.id, goal));
  }

  createForCurrentPm(createGoalDto: CreateGoalDto) : Subscription {
    createGoalDto.currentStep = 0;
    return this.http.post<Goal>("goals/for-current-pm", createGoalDto).subscribe(goal => this.goals.set(goal.id, goal));
  }

  editGoal(goal: Goal) : Subscription {
    return this.http.patch<Goal>(`goals/${goal.id}`, goal).subscribe(() => this.goals.set(goal.id, goal));
  }

  deleteGoal(id: number) : Subscription {
    return this.http.delete<Goal>(`goals/${id}`).subscribe(() => this.goals.delete(id));
  }
}
