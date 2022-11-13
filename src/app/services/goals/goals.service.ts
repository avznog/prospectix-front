import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateGoalDto } from 'src/app/dto/goals/update-goal.dto';
import { Goal } from 'src/app/models/goal.model';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { ProjectManagersService } from '../project-managers/project-managers.service';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  goals = new Map<ProjectManager, Goal>();
  constructor(
    private http: HttpClient,
    private readonly pmService: ProjectManagersService,
    private readonly toastsService: ToastsService
  ) { 
    this.findAll().subscribe(goals => goals.forEach(goal => this.goals.set(goal.pm, goal)))
  }

  findAll() {
    return this.http.get<Goal[]>(`goals/find-all`);
  }

  updateDisable(pm: ProjectManager, goal: Goal, updateGoalDto: UpdateGoalDto) {
    return this.http.patch<Goal>(`goals/${goal.id}`, updateGoalDto).subscribe(() => {
      this.goals.set(pm, { ...this.goals.get(pm)!, disabled: updateGoalDto.disabled!})
      this.toastsService.addToast({
        type: updateGoalDto.disabled! ? "alert-error" : "alert-success",
        message: `Objectif ${goal.goalTemplate.name} ${updateGoalDto.disabled! ? 'désactivé' : 'activé'} pour ${pm.pseudo}`
      })
    })
  }

  udpateValue(pm: ProjectManager, goal: Goal, updateGoalDto: UpdateGoalDto) {
    return this.http.patch<Goal>(`goals/${goal.id}`, updateGoalDto).subscribe(() => {
      this.goals.set(pm, { ...this.goals.get(pm)!, value: updateGoalDto.value! })
      let g = this.pmService.pmGoals.get(pm)!;
      let goalsOfPm: Goal[] = [];
      g.forEach(gl => {
        if(gl.id == goal.id) {
          goalsOfPm.push({ ...gl, value: updateGoalDto.value! })
        } else {
          goalsOfPm.push(gl)
        }
      });
      this.pmService.pmGoals.set(pm, goalsOfPm);
      this.toastsService.addToast({
        type: "alert-success",
        message: `Valeur de ${goal.goalTemplate.name} pour ${pm.pseudo} modifiée à ${updateGoalDto.value!}`
      })
    })
  }
}
