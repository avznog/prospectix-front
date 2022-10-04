import { Component, OnInit } from '@angular/core';
import { StageType } from 'src/app/constants/stage.type';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { Country } from 'src/app/models/country.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss']
})
export class AddProspectComponent implements OnInit {

  constructor(
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    public readonly countriesService: CountriesService,
    private readonly prospectService: ProspectsService,
    private readonly toastsService: ToastsService
  ) { }

  // City
  addCityDisabled = false;
  city: City = {} as City;
  addCity: string = "";
  addZipcode: number = Number();

  // Activity
  addActivityDisabled = false;
  activity: Activity = {} as Activity;
  addActivity: string = "";

  // Country
  addCountryDisabled = false;
  country: Country = {} as Country;
  addCountry: string = "";
  
  // Prospect
  companyName: string = "";
  address: string = "";
  phone: string = "";
  email: string = "";
  website: string = "";
  comment: string = "";

  ngOnInit(): void {
  }

  onCreateProspect() {
    this.prospectService.create({
      activity: !this.activity.name ? { name: this.addActivity } : this.activity,
      city: !this.city.name ? { name: this.addCity, zipcode: this.addZipcode } : this.city,
      country: !this.country.name ? { name: this.addCountry } : this.country,
      stage: StageType.RESEARCH,
      phone: {
        number: this.phone
      },
      email: {
        email: this.email
      },
      website: {
        website: this.website
      },
      companyName: this.companyName,
      streetAddress: this.address,
      comment: this.comment,
      nbNo: 0,
      disabled: false,
      isBookmarked: false
    });

    this.toastsService.addToast({
      type: "alert-success",
      message: "Prospect ajouté"
    });
  }

  onAddCity() {
    this.citiesService.create({
      name: this.addCity,
      zipcode: this.addZipcode
    });
  }

  onEditAddCity() {
    this.citiesService.cities.filter(city => city.name.toLowerCase() == this.addCity.toLowerCase() || city.zipcode == this.addZipcode).length == 0 ? this.addCityDisabled = false : this.addCityDisabled = true;
  }

  onAddActivity() {
    this.activitiesService.add({
      name: this.addActivity
    });
  }

  onEditAddActivity() {
    this.activitiesService.activities.filter(activity => activity.name.toLowerCase() == this.addActivity.toLowerCase()).length == 0 ? this.addActivityDisabled = false : this.addActivityDisabled = true;
  }

  onAddCountry() {
    this.countriesService.add({
      name: this.addCountry
    });
  }

  onEditAddCountry() {
    this.countriesService.countries.filter(country => country.name.toLowerCase() == this.addCountry.toLowerCase()).length == 0 ? this.addCountryDisabled = false : this.addCountryDisabled = true;
  }

}
