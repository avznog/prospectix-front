import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoalTemplate } from 'src/app/models/goal-template.model';

@Injectable({
  providedIn: 'root'
})
export class GoalTemplatesService {

  goalTemplates = new Map<number, GoalTemplate>();

  constructor(
    private http: HttpClient
  ) { 
    this.laodGoalTemplates().subscribe(goalTemplates => goalTemplates.forEach(goalTemplate => this.goalTemplates.set(goalTemplate.id, goalTemplate)))
  }

  laodGoalTemplates() {
    return this.http.get<GoalTemplate[]>(`goal-templates/find-all`)
  }

  toggleDisabled(goalTemplate: KeyValue<number, GoalTemplate>) {
    return this.http.patch<GoalTemplate>(`goal-templates/${goalTemplate.value.id}`, {disabled: !goalTemplate.value.disabled}).subscribe(() => this.goalTemplates.set(goalTemplate.key, { ...goalTemplate.value, disabled: !goalTemplate.value.disabled }))
  }
}
