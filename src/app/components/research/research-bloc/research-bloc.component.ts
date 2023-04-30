import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { City } from 'src/app/models/city.model';
import { PrimaryActivity } from 'src/app/models/primary-activity.model';
import { SecondaryActivity } from 'src/app/models/secondary-activity.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { AddProspectComponent } from '../../common/add-prospect/add-prospect.component';

@Component({
  selector: 'app-research-bloc',
  templateUrl: './research-bloc.component.html',
  styleUrls: ['./research-bloc.component.scss']
})
export class ResearchBlocComponent implements OnInit {
  keyword: string | null = null;
  city: City | null = null;
  zipcode: City | null = null;
  primaryActivity: PrimaryActivity | null = null;
  secondaryActivity: SecondaryActivity | null = null;

  constructor(
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    public readonly prospectsService: ProspectsService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.keyword = this.prospectsService.researchParamsProspect.keyword;
    this.ngxSmartModalService.create('add-prospect', AddProspectComponent).addCustomClass('add-prospect');
  }

  updateParameters() {
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      keyword: this.keyword != '' ? this.keyword ?? null : null,
      city: this.city?.name ?? null,
      primaryActivity: this.primaryActivity?.id ?? null,
      secondaryActivity: this.primaryActivity ? this.secondaryActivity?.id ?? null : null,
      zipcode: this.city ? this.zipcode?.zipcode ?? null : null
    })
  }

  changeCity() {
    this.zipcode = null;
  }

  changePrimaryActivity() {
    this.secondaryActivity = null;
  }
}
