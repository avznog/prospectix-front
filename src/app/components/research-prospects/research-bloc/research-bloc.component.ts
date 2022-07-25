import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-research-bloc',
  templateUrl: './research-bloc.component.html',
  styleUrls: ['./research-bloc.component.scss']
})
export class ResearchBlocComponent implements OnInit {
  @Output() updateProspectEvent = new EventEmitter<Prospect[]>();
  @Output() updateCurrentCityEvent = new EventEmitter<City>();
  @Output() updateCurrentActivityEvent = new EventEmitter<Activity>();
  @Input() prospects!: Prospect[];
  @Input() currentCity!: City;
  @Input() currentActivity!: Activity;
  researchForm!: FormGroup;
  activites!: Activity[];
  cities!: City[];

  constructor(
    private formBuilder: FormBuilder,
    private readonly activitiesService: ActivitiesService,
    private readonly citiesServices: CitiesService,
    private readonly prospectsService: ProspectsService
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
      activity: ["", Validators.required],
      searchBar: ["", Validators.required]
    });
  }

  onCityChange() {
    if (this.researchForm.value["city"] != "Toutes les villes") {
      this.prospectsService.findAllByCity(this.researchForm.value["city"])
        .subscribe({
          next: (data) => {
            this.updateProspects(data);
            this.updateCurrentCity(
              {
                id: 0,
                name: this.researchForm.value["city"],
                zipcode: 0
              }
            );
          },
          error: (err) => {
            console.log(err)
          }
        });
    } else {
      this.prospectsService.findAll()
        .subscribe({
          next: (data) => {
            this.updateProspects(data);
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  onActivityChange() {
    if (this.researchForm.value["activity"] != "Tous les domaines d'activité") {
      this.prospectsService.findAllByActivity(this.researchForm.value["activity"])
        .subscribe({
          next: (data) => {
            this.updateProspects(data);
            this.updateCurrentActivity(
              {
                id: 0,
                name: this.researchForm.value["activity"],
              }
            );
          },
          error: (err) => {
            console.log(err)
          }
        });
    } else {
      this.prospectsService.findAll()
        .subscribe({
          next: (data) => {
            console.log(data)
            this.updateProspects(data);
            this.updateCurrentActivity({
              id: -1,
              name: "Tous les domaines d'activité"
            });
            this.updateCurrentCity({
              id: -1,
              name: "Toutes les villes",
              zipcode: -1
            })
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  updateProspects(value: Prospect[]) {
    this.updateProspectEvent.emit(value);
  }

  updateCurrentCity(value: City) {
    this.updateCurrentCityEvent.emit(value);
  }

  updateCurrentActivity(value: Activity) {
    this.updateCurrentActivityEvent.emit(value);
  }

  onSearchChange(): void {
    console.log("changed by keyword")
    if (this.researchForm.value["searchBar"] != "") {

      this.prospectsService.findAllByKeyword(this.researchForm.value["searchBar"])
        .subscribe({
          next: (data) => {
            this.updateProspects(data);
          },
          error: (err) => {
            console.log(err)
          }
        });
    }
  }

}
