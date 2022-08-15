import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ResearchParamsProspect } from 'src/app/models/research-params-prospect.model';

@Component({
  selector: 'app-research-bloc',
  templateUrl: './research-bloc.component.html',
  styleUrls: ['./research-bloc.component.scss']
})
export class ResearchBlocComponent implements OnInit {
  
  @Input() researchParamsProspect! : ResearchParamsProspect;
  @Output() updateResearchParamsProspectEvent = new EventEmitter<ResearchParamsProspect>();

  activities!: Activity[];
  cities!: City[];
  formKeyword = new FormControl("");
  formActivity = new FormControl("allActivities");
  formCity = new FormControl("allCities");

  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly citiesService: CitiesService,
  ) { }

  ngOnInit(): void {
    this.activitiesService.findAll()
      .subscribe({
        next: (data) => {
          this.activities = data
        },
        error: (err) => {
          console.log(err)
        }
      });

    this.citiesService.findAll()
      .subscribe({
        next: (data) => {
          this.cities = data;
        },
        error: (err) => {
          console.log(err);
        }
      });

  }

  onEditCity() {
    this.updateResearchParamsProspect({
      ...this.researchParamsProspect,
      city: this.formCity.value == "allCities" ? "" : this.formCity.value
    });
  }

  onEditActivity() {
    this.updateResearchParamsProspect({
      ...this.researchParamsProspect,
      activity: this.formActivity.value == "allActivities" ? "" : this.formActivity.value
    });
  }

  onEditKeyword(): void {
    this.updateResearchParamsProspect({
      ...this.researchParamsProspect,
      keyword: this.formKeyword.value
    });
  }

  updateResearchParamsProspect(value: ResearchParamsProspect) {
    this.updateResearchParamsProspectEvent.emit(value);
  }

}
