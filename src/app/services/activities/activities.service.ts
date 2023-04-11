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

  constructor(
    private http: HttpClient
  ) { 
   
    this.findAllPrimaryActivities().subscribe(primaryActivities => primaryActivities.forEach(primaryActivity => this.primaryActivities.push(primaryActivity)));
    
  }
  findAllPrimaryActivities() {
    return this.http.get<PrimaryActivity[]>(`primary-activities/find-all`);
  }
}
