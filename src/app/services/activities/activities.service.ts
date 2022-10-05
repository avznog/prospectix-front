import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateActivityDto } from 'src/app/dto/activities/create-activity.dto';
import { Activity } from 'src/app/models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  activities: Activity[] = [];
  countActvities = new Map<number, number>();
  constructor(
    private http: HttpClient
  ) { 
    this.findAll().subscribe(activities => this.activities = activities);
    this.countForDomains().subscribe(activities => activities.forEach(activity => this.countActvities.set(activity.id, activity.count)));
  }

  findAll() {
    return this.http.get<Activity[]>("activities");
  }

  add(createActivityDto: CreateActivityDto) {
    return this.http.post<Activity>("activities/add", createActivityDto).subscribe(activity => this.activities.push(activity));
  }

  countForDomains() {
    return this.http.get<{id: number, count: number}[]>(`prospects/count-for-domains`);
  }
}
