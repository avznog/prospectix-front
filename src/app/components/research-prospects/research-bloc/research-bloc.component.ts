import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ResearchParams } from 'src/app/models/research-params.model';

@Component({
  selector: 'app-research-bloc',
  templateUrl: './research-bloc.component.html',
  styleUrls: ['./research-bloc.component.scss']
})
export class ResearchBlocComponent implements OnInit {
  
  @Input() researchParams! : ResearchParams;

  @Output() updateResearchParamsEvent = new  EventEmitter<ResearchParams>();

  researchForm!: FormGroup;
  activities!: Activity[];
  cities!: City[];

  constructor(
    private formBuilder: FormBuilder,
    private readonly activitiesService: ActivitiesService,
    private readonly citiesServices: CitiesService,
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

    this.citiesServices.findAll()
      .subscribe({
        next: (data) => {
          this.cities = data;
        },
        error: (err) => {
          console.log(err);
        }
      });

    this.researchForm = this.formBuilder.group({
      city: ["", Validators.required],
      activity: ["", Validators.required],
      keyword: ["", Validators.required]
    });
  }

  onCityChange() {
    console.log(this.researchForm.value["city"]);
    this.updateResearchParams({
      ...this.researchParams,
      city: this.researchForm.value["city"] == "allCities" ? "" : this.researchForm.value["city"]
    });
  }

  onActivityChange() {
    console.log(this.researchForm.value["activity"])
    this.updateResearchParams({
      ...this.researchParams,
      activity: this.researchForm.value["activity"] == "allActivities" ? "" : this.researchForm.value["activity"]
    });
  }

  onSearchChange(): void {
    console.log(this.researchForm.value["searchBar"])
    this.updateResearchParams({
      ...this.researchParams,
      keyword: this.researchForm.value["keyword"]
    });
  }

  updateResearchParams(value: ResearchParams) {
    console.log(`PARAMS : 
    activity : ${value.activity}
    city : ${value.city}
    keyword : ${value.keyword}
    `)
    this.updateResearchParamsEvent.emit(value);
  }

}
