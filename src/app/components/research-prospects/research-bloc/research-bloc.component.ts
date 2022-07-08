import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';

@Component({
  selector: 'app-research-bloc',
  templateUrl: './research-bloc.component.html',
  styleUrls: ['./research-bloc.component.scss']
})
export class ResearchBlocComponent implements OnInit {

  researchForm!: FormGroup;
  activites!: Activity[];
  cities!: City[];
  currentCity!: City;
  currentActivity!: Activity;
  constructor(
    private formBuilder: FormBuilder,
    private readonly activitiesService: ActivitiesService,
    private readonly citiesServices: CitiesService
  ) { }

  ngOnInit(): void {
    this.activitiesService.findAll()
      .subscribe({
        next: (data) => {
          this.activites = data
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
        activity: ["", Validators.required]
      });
  }
  
  onCityChange() {
    console.log(this.researchForm.value)
    this.currentCity = this.researchForm.value["city"];
  }

  onActivityChange() {
    console.log(this.researchForm.value["activity"])
    this.currentActivity = this.researchForm.value["activity"];
  }

}
