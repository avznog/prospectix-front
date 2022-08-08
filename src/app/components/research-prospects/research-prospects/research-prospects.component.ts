import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-research-prospects',
  templateUrl: './research-prospects.component.html',
  styleUrls: ['./research-prospects.component.scss']
})
export class ResearchProspectsComponent implements OnInit {
  prospects!: Prospect[];
  currentCity!: City;
  currentActivity!: Activity;
  noProspect!: boolean;
  currentPage = 0;

  constructor(
    private readonly prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
    this.prospectsService.findAllAndCount(2,this.currentPage)
    .subscribe({
      next: (data) => {
        console.log(data[0])
        this.prospects = data[0];
        console.log(data)
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.currentCity = {
      id: -1,
      name: "Toutes les villes",
      zipcode: -1
    } as City;

    this.currentActivity = {
      id: -1,
      name: "Tous les domaines d'activité"
    }
  }

  updateProspects(newProspects: Prospect[]) {
    console.log("prospects updated")
    this.prospects = newProspects;
    if(this.prospects.length == 0) {
      this.noProspect = true;
    } else {
      this.noProspect = false;
    }
  }

  updateCurrentCity(newCurrentCity: City) {
    console.log("city updated");
    this.currentCity = newCurrentCity;
  }

  updateCurrentActivity(newCurrentActivity: Activity) {
    console.log("activity updated")
    this.currentActivity = newCurrentActivity;
  }

  pageDown() {
    this.currentPage -= 2;
    this.prospectsService.findAllAndCount(2,this.currentPage)
    .subscribe({
      next: (data) => {
        console.log(data[0])
        this.prospects = data[0];
        console.log(data)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  pageUp() {
    this.currentPage += 2;
    this.prospectsService.findAllAndCount(2,this.currentPage)
    .subscribe({
      next: (data) => {
        console.log(data[0])
        this.prospects = data[0];
        console.log(data)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
