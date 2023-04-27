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
  city: number | null = null;
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

  updateParameters() {
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      keyword: (!this.secondaryActivity && !this.city && !this.primaryActivity) ? this.keyword == '' ? null : this.keyword : null,
      secondaryActivity: (!this.keyword && !this.city) ? !this.primaryActivity ? null : !this.secondaryActivity ? null : this.secondaryActivity?.id : null,
      city: (!this.keyword && !this.secondaryActivity && !this.primaryActivity) ? this.city : null,
      primaryActivity: (!this.city && !this.keyword) ? this.primaryActivity?.id ?? null : null
    })
  }

  changePrimaryActivity() {
    this.secondaryActivity = null;
  }
}
