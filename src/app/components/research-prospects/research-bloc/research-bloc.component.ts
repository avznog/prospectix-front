import { Component, OnInit } from '@angular/core';
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
  formCity: string = "allCities";

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
      city: this.formCity == "allCities" ? "": this.formCity
    })
  }

  onEditActivity() {
    this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      activity: this.formActivity == "allActivities" ? "" : this.formActivity
    });
  }

  onEditKeyword() {
    setTimeout(() => {
       this.prospectsService.resetSearch({
      ...this.prospectsService.researchParamsProspect,
      keyword: this.formKeyword
    });
    }, 200)
   
  }

}
