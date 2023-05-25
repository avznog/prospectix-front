import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GoalTemplate } from 'src/app/models/goal-template.model';
import { Goal } from 'src/app/models/goal.model';
import { ProjectManager } from 'src/app/models/project-manager.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagersService {

  myCallsGoal: Goal = {
    goalTemplate: {} as GoalTemplate
  } as Goal;
  myMeetingsGoal: Goal = {
    goalTemplate: {} as GoalTemplate
  } as Goal;
  myGoals: Goal[] = [];
  projectManagers: ProjectManager[] = [];
  pmGoals = new Map<ProjectManager, Goal[]>();

  projectManagersForMeetings: ProjectManager[] = [];

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) { 
    this.findAll().subscribe(projectManagers => {
      this.projectManagers = projectManagers
      
      projectManagers.filter(pm => pm.objectived).forEach(pm => {
        pm.goals.sort((a: Goal, b: Goal) => (a.goalTemplate.id - b.goalTemplate.id))
        this.pmGoals.set(pm, pm.goals)

      })
      this.updateMyGoals();
    });
    this.findAllPmForMeetings()
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
    this.updateMyGoals();
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
    this.updateMyGoals();
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
    this.updateMyGoals();
  }

  checkGoals(pm: ProjectManager) {
    this.http.get<Goal[]>(`goals/check/${pm.id}`).subscribe(goals => {
      this.pmGoals.set(pm, goals)
      this.updateMyGoals();
    });
  }

  updateMyGoals() {
    for(let pmGoal of this.pmGoals) {
      if(pmGoal[0].id == this.authService.currentUserSubject.getValue().id ) {
          this.myGoals = this.pmGoals.get(pmGoal[0])!
          this.myCallsGoal = this.myGoals.find(goal => goal.goalTemplate.name == "Appels")!
          this.myMeetingsGoal = this.myGoals.find(goal => goal.goalTemplate.name == "Rendez-vous")!
      }
    }
  }

  // find all pm who we can give a meeting to
  findAllPmForMeetings() {
    this.http.get<ProjectManager[]>(`project-managers/find-all-for-meetings`).subscribe(pms => {
      this.projectManagersForMeetings = pms;
    })
  }
}
