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
  formKeyword: string = "";
  formSecondaryActivity: string = "allActivities";
  formZipcode: number = -1000;

  primaryActivity: PrimaryActivity | null = null;
  secondaryActivity: SecondaryActivity | null = null;

  constructor(
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    public readonly prospectsService: ProspectsService,
  ) { }

  ngOnInit(): void {
      this.formKeyword = this.prospectsService.researchParamsProspect.keyword;
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
      secondaryActivity: this.formSecondaryActivity
    });
  }

  onEditKeyword() {
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      keyword: this.formKeyword
    });
  }
}
