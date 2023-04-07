import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSecondaryActivityDto } from 'src/app/dto/secondary-activities/create-secondary-activity.dto';
import { PrimaryActivity } from 'src/app/models/primary-activity.model';
import { SecondaryActivity } from 'src/app/models/secondary-activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  // ? primaryActivities
  primaryActivities: PrimaryActivity[] = []; 

  // ? secondaryActivities
  // secondaryActivities: SecondaryActivity[] = [];
  // countSecondaryActvities = new Map<number, number>();
  constructor(
    private http: HttpClient
  ) { 
    // this.findAllSecondaryActivities().subscribe(secondaryActivities => this.secondaryActivities = secondaryActivities);
    this.findAllPrimaryActivities().subscribe(primaryActivities => primaryActivities.forEach(primaryActivity => this.primaryActivities.push(primaryActivity)));
    // this.countSecondaryActivitiesForDomains().subscribe(secondaryActivities => secondaryActivities.forEach(secondaryActivity => this.countSecondaryActvities.set(secondaryActivity.id, secondaryActivity.count)));
  }

  // findAllSecondaryActivities() {
  //   return this.http.get<SecondaryActivity[]>("secondary-activities");
  // }

  // addSecondaryActivity(createSecondaryActivityDto: CreateSecondaryActivityDto) {
  //   return this.http.post<SecondaryActivity>("secondary-activities/add", createSecondaryActivityDto).subscribe(secondaryActivity => this.secondaryActivities.push(secondaryActivity));
  // }

  // countSecondaryActivitiesForDomains() {
  //   return this.http.get<{id: number, count: number}[]>(`prospects/count-for-domains`);
  // }

  findAllPrimaryActivities() {
    return this.http.get<PrimaryActivity[]>(`primary-activities/find-all`);
  }
}
