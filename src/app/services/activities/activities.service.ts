import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSecondaryActivityDto } from 'src/app/dto/secondary-activities/create-secondary-activity.dto';
import { SecondaryActivity } from 'src/app/models/secondary-activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  secondaryActivities: SecondaryActivity[] = [];
  countSecondaryActvities = new Map<number, number>();
  constructor(
    private http: HttpClient
  ) { 
    this.findAll().subscribe(secondaryActivities => this.secondaryActivities = secondaryActivities);
    this.countForDomains().subscribe(secondaryActivities => secondaryActivities.forEach(secondaryActivity => this.countSecondaryActvities.set(secondaryActivity.id, secondaryActivity.count)));
  }

  findAll() {
    return this.http.get<SecondaryActivity[]>("secondary-activities");
  }

  add(createSecondaryActivityDto: CreateSecondaryActivityDto) {
    return this.http.post<SecondaryActivity>("secondary-activities/add", createSecondaryActivityDto).subscribe(secondaryActivity => this.secondaryActivities.push(secondaryActivity));
  }

  countForDomains() {
    return this.http.get<{id: number, count: number}[]>(`prospects/count-for-domains`);
  }
}
