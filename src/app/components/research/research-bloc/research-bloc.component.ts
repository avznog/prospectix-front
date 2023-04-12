import { Component, OnInit } from '@angular/core';
import { PrimaryActivity } from 'src/app/models/primary-activity.model';
import { SecondaryActivity } from 'src/app/models/secondary-activity.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-research-bloc',
  templateUrl: './research-bloc.component.html',
  styleUrls: ['./research-bloc.component.scss']
})
export class ResearchBlocComponent implements OnInit {
  keyword: string | null = null;
  zipcode: number | null = null;
  primaryActivity: PrimaryActivity | null = null;
  secondaryActivity: SecondaryActivity | null = null;

  constructor(
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    public readonly prospectsService: ProspectsService,
  ) { }

  ngOnInit(): void {
      this.keyword = this.prospectsService.researchParamsProspect.keyword;
  }

  onEditCity() {
    this.zipcode ? this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      zipcode: this.zipcode,
      keyword: null,
      secondaryActivity: null,
      primaryActivity: null
    }) : 
      this.primaryActivity ? this.secondaryActivity ? this.onSecondaryActivityChange() : 
      this.onPrimaryActivityChange() : 
        this.keyword ? 
        this.onEditKeyword() : 
        this.prospectsService.resetSearch({
          ...this.prospectsService.researchParamsProspect,
          keyword: null,
          zipcode: null,
          secondaryActivity: null,
          primaryActivity: null,
        })
    
  }
  onPrimaryActivityChange() {
    this.primaryActivity ? this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      zipcode: null,
      keyword: null,
      secondaryActivity: null,
      primaryActivity: this.primaryActivity!.name
    }) : 
      this.zipcode ? 
      this.onEditCity() :
        this.keyword ? 
        this.onEditKeyword() :
          this.prospectsService.resetSearch({
            ...this.prospectsService.researchParamsProspect,
            keyword: null,
            zipcode: null,
            secondaryActivity: null,
            primaryActivity: null,
          })
  }

  onSecondaryActivityChange() {
    this.secondaryActivity ?
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      zipcode: null,
      keyword: null,
      secondaryActivity: this.secondaryActivity!.name,
      primaryActivity: this.primaryActivity!.name
    }) : this.onPrimaryActivityChange() 
  }

  onEditKeyword() {
    this.keyword ? this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      keyword: this.keyword,
      zipcode: null,
      secondaryActivity: null,
      primaryActivity: null
    }) :
      this.zipcode ? 
      this.onEditCity() :
        this.primaryActivity ? this.secondaryActivity ? this.onSecondaryActivityChange() : 
        this.onPrimaryActivityChange() :
        this.prospectsService.resetSearch({
          ...this.prospectsService.researchParamsProspect,
          keyword: null,
          zipcode: null,
          secondaryActivity: null,
          primaryActivity: null,
        });
  }
}
