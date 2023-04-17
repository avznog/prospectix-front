import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimaryActivity } from 'src/app/models/primary-activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  // ? primaryActivities
  primaryActivities: PrimaryActivity[] = []; 
  primaryActivitiesWithoutLimit: PrimaryActivity[] = [];
  
  constructor(
    private http: HttpClient
  ) { 
    this.findAllPrimaryActivities().subscribe(primaryActivities => {
      primaryActivities.forEach(primaryActivity => this.primaryActivities.push(primaryActivity))
    });

    this.findAllPrimaryActivitiesWithoutLimit().subscribe(primaryActivities => {
      this.primaryActivitiesWithoutLimit = primaryActivities
    });
  }
  findAllPrimaryActivities() {
    return this.http.get<PrimaryActivity[]>(`primary-activities/find-all`);
  }

  findAllPrimaryActivitiesWithoutLimit() {
    return this.http.get<[PrimaryActivity]>(`primary-activities/find-all-without-limit`)
  }
}
