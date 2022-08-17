import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateActivityDto } from 'src/app/dto/activities/create-activity.dto';
import { Activity } from 'src/app/models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  activities: Activity[] = []
  constructor(
    private http: HttpClient
  ) { 
    this.findAll().subscribe(activities => this.activities = activities);
  }

  findAll() {
    return this.http.get<Activity[]>("activities");
  }

  add(createActivityDto: CreateActivityDto) {
    return this.http.post<Activity>("activities/add", createActivityDto).subscribe(activity => this.activities.push(activity));
  }
}
