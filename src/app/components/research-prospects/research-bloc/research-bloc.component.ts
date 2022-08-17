import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ResearchParamsProspect } from 'src/app/models/research-params-prospect.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-research-bloc',
  templateUrl: './research-bloc.component.html',
  styleUrls: ['./research-bloc.component.scss']
})
export class ResearchBlocComponent implements OnInit {
  formKeyword = new FormControl("");
  formActivity = new FormControl("allActivities");
  formCity = new FormControl("allCities");

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
      city: this.formCity.value == "allCities" ? "": this.formCity.value
    })
  }

  onEditActivity() {
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      activity: this.formActivity.value == "allActivities" ? "" : this.formActivity.value
    });
  }

  onEditKeyword() {
    setTimeout(() => {
       this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      keyword: this.formKeyword.value
    });
    }, 200)
   
  }

}
