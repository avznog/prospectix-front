import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { City } from 'src/app/models/city.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-research-bloc',
  templateUrl: './research-bloc.component.html',
  styleUrls: ['./research-bloc.component.scss']
})
export class ResearchBlocComponent implements OnInit {
  formKeyword: string = "";
  formActivity: string = "allActivities";
  formZipcode: number = -1000;

  constructor(
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    public readonly prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
  }

  onEditCity() {
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      zipcode: this.formZipcode
    })
  }

  onEditActivity() {
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      activity: this.formActivity
    });
  }

  onEditKeyword() {
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      keyword: this.formKeyword
    });
  }

}
