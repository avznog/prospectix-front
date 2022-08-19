import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrls: ['./prospect-details.component.scss']
})
export class ProspectDetailsComponent implements OnInit {

  @Input() prospect!: Prospect;
  activity: string = "";
  city: string = "";
  
  constructor(
    private prospectsService: ProspectsService,
    public citiesService: CitiesService,
    public activitiesService: ActivitiesService
  ) {
    
   }

  ngOnInit(): void {
    this.activity = this.prospect.city.name;
    this.city = this.prospect.city.name
  }

  onChangeNbNo() {
    this.prospectsService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 })
  }

  onChangeActivity() {
   console.log("activity changed");
   this.prospectsService.updateByActivity(this.prospect.id, this.activity);
  }

  onChangeCity() {
    console.log("city changed")
    this.prospectsService.updateByCity(this.prospect.id, this.city);
  }

  onClickRefus() {
    this.prospectsService.disable(this.prospect.id);
  }
}
