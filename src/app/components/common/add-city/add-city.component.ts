import { Component, OnInit } from '@angular/core';
import { VersionCityType } from 'src/app/constants/versions.type';
import { CitiesService } from 'src/app/services/cities/cities.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {

  name: string = "";
  zipcode: number = 0;
  disabled: boolean = true;
  constructor(
    public readonly citiesService: CitiesService
  ) { }

  ngOnInit(): void {
  }

  onCheckDisabled() {
    if(this.citiesService.cities.filter(city => city.zipcode == this.zipcode).length > 0 || (this.zipcode && this.zipcode.toFixed().length < 4) || this.name == "" || !this.zipcode) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  onAddCity() {
    this.citiesService.create({
      name: this.name,
      zipcode: this.zipcode,
      version: VersionCityType.MANUALLY_ADDED,
      dateScraped: new Date
    });
  }
}
