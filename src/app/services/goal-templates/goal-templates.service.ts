import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateGoalTemplateDto } from 'src/app/dto/goal-templates/create-goal-template.dto';
import { UpdateGoalTemplateDto } from 'src/app/dto/goal-templates/update-goal-template.dto';
import { GoalTemplate } from 'src/app/models/goal-template.model';
import { Goal } from 'src/app/models/goal.model';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';

@Injectable({
  providedIn: 'root'
})
export class GoalTemplatesService {

  goalTemplates = new Map<number, GoalTemplate>();

  constructor(
    private http: HttpClient,
    private pmService: ProjectManagersService
  ) { 
    this.laodGoalTemplates().subscribe(goalTemplates => goalTemplates.forEach(goalTemplate => this.goalTemplates.set(goalTemplate.id, goalTemplate)))
  }

  laodGoalTemplates() {
    return this.http.get<GoalTemplate[]>(`goal-templates/find-all`)
  }

  toggleDisabled(goalTemplate: KeyValue<number, GoalTemplate>) {
    return this.http.patch<GoalTemplate>(`goal-templates/${goalTemplate.value.id}`, {disabled: !goalTemplate.value.disabled}).subscribe(() => this.goalTemplates.set(goalTemplate.key, { ...goalTemplate.value, disabled: !goalTemplate.value.disabled }))
  }

  create(createGoalTemplateDto: CreateGoalTemplateDto) {
    return this.http.post<{goalTemplate: GoalTemplate, goals: Goal[]}>(`goal-templates`, createGoalTemplateDto).subscribe(data => {
      // Creating the goal template in the front
      this.goalTemplates.set(data.goalTemplate.id, data.goalTemplate);
      
      // Setting the goals of the front
      console.log(data)
      console.log(this.pmService.pmGoals)
      for(let pmGoal of this.pmService.pmGoals) {
        for(let goal of data.goals) {
          if(pmGoal[0].id == goal.pm.id) {
            let g = pmGoal[1];
            g.push(goal)
            console.log(goal)
            // Add default value for new goal template
            this.pmService.pmGoals.set(pmGoal[0], g);
          }
        }
      }
    })
  }

  udpate(id: number, updateGoalTemplateDto: UpdateGoalTemplateDto) {
    return this.http.patch<GoalTemplate>(`goal-templates/${id}`, updateGoalTemplateDto).subscribe(() => this.goalTemplates.set(id, { ...this.goalTemplates.get(id)!, ...updateGoalTemplateDto}))
  }

  delete(id: number) {
    return this.http.delete(`goal-templates/${id}`).subscribe(() => {

      // Removing the goal tempalte from the list of all goal templates
      this.goalTemplates.delete(id);

      // Removig the goals where they are linked to the goal tmepaltes
      this.pmService.pmGoals.forEach((goals, pm) => {
        let g : Goal[] = [];
        goals.forEach(goal => {
          if(goal.goalTemplate.id != id) {
            g.push(goal)
          }
        })
        this.pmService.pmGoals.set(pm, g);
      })
    })
  }
}
