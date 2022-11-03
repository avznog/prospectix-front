import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoalTemplate } from 'src/app/models/goal-template.model';
import { Goal } from 'src/app/models/goal.model';
import { ProjectManager } from 'src/app/models/project-manager.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagersService {

  projectManagers: ProjectManager[] = [];
  pmGoals = new Map<ProjectManager, Goal[]>();

  constructor(
    private http: HttpClient
  ) { 
    this.findAll().subscribe(projectManagers => {
      this.projectManagers = projectManagers
      
      projectManagers.filter(pm => pm.objectived).forEach(pm => {
        pm.goals.sort((a: Goal, b: Goal) => (a.goalTemplate.id - b.goalTemplate.id))
        this.pmGoals.set(pm, pm.goals)

      })
    });
  }

  findAll() {
    return this.http.get<ProjectManager[]>("project-managers/findAll");
  }

  changeObjectived(pm: ProjectManager, objectived: boolean) {
    if(objectived) {
      pm.objectived = objectived;
      this.pmGoals.set(pm, pm.goals)
      
    } else {
      this.pmGoals.forEach((key, value) => {
        if(value.pseudo == pm.pseudo) {
          this.pmGoals.delete(value)
        }
      })
    }
  }

  toggleDisabledPmGoalsTemplate(goalTemplate: KeyValue<number, GoalTemplate>) {
    this.pmGoals.forEach((key, value) => {
      key.forEach(goal => {
        if(goal.goalTemplate.id == goalTemplate.key && goal.goalTemplate.disabled == goalTemplate.value.disabled) {
          return goal.goalTemplate.disabled = !goalTemplate.value.disabled
        }
        return
      })
    })
  }

  toggleDisableGoal(pm: ProjectManager, goal: Goal) {
    let goals = this.pmGoals.get(pm);
    goals?.forEach(g => {
      if(g.id == goal.id) {
        return g.disabled = !goal.disabled
      }
      return
    });
    this.pmGoals.set(pm, goals!);
  }

  checkGoals(pm: ProjectManager) {
    this.http.get<Goal[]>(`goals/check/${pm.id}`).subscribe(goals => this.pmGoals.set(pm, goals));
  }
}
