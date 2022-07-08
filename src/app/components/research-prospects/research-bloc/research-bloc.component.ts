import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  activites!: Activity[];
  cities!: City[];
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
  }

}
