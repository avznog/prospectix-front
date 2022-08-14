import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { Country } from 'src/app/models/country.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss']
})
export class AddProspectComponent implements OnInit {

  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly citiesService: CitiesService,
    private readonly countriesService: CountriesService,
    private readonly prospectService: ProspectsService
  ) { }

  // City
  cities!: City[];
  addCityDisabled = false;
  newCity = false;
  formCity = new FormControl({} as City);
  formAddCity = new FormControl("");
  formAddZipcode = new FormControl("");

  // Activity
  activities!: Activity[];
  addActivityDisabled = false;
  newActivity = false;
  formActivity = new FormControl({} as Activity);
  formAddActivity = new FormControl("");

  // Country
  countries!: Country[];
  addCountryDisabled = false;
  newCountry = false;
  formCountry = new FormControl({} as Country);
  formAddCountry = new FormControl("");
  
  // Prospect
  formCompanyName = new FormControl("");
  formAddress = new FormControl("");
  formPhone = new FormControl("");
  formEmail = new FormControl("");
  formWebsite = new FormControl("");
  formComment = new FormControl("");

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

      this.countriesService.findAll()
        .subscribe({
          next: (data) => {
            console.log(data)
            this.countries = data;
          },
          error: (err) => {
            console.log(err)
          }
        })
  }

  onCreateProspect() {
    this.prospectService.create({
      activity: this.newActivity ? { name: this.formAddActivity.value } : this.formActivity.value,
      city: this.newCity ? { name: this.formAddCity.value, zipcode: this.formAddZipcode.value } : this.formCity.value,
      country: this.newCountry ? { name: this.formAddCountry.value } : this.formCountry.value,
      phone: {
        number: this.formPhone.value
      },
      email: {
        email: this.formEmail.value
      },
      website: {
        website: this.formWebsite.value
      },
      companyName: this.formCompanyName.value,
      streetAddress: this.formAddress.value,
      comment: this.formComment.value,
      nbNo: 0,
      disabled: false,
      isBookmarked: false
    });
  }

  onAddCity() {
    this.cities.push({
      id: Number(),
      name: this.formAddCity.value,
      zipcode: this.formAddZipcode.value
    });
    this.newCity = true;
  }

  onEditAddCity() {
    this.cities.filter(city => city.name.toLowerCase() == this.formAddCity.value.toLowerCase() || city.zipcode == this.formAddZipcode.value).length == 0 ? this.addCityDisabled = false : this.addCityDisabled = true;
  }

  onAddActivity() {
    this.activities.push({
      id: Number(),
      name: this.formAddActivity.value
    });
    this.newActivity = true;
  }

  onEditAddActivity() {
    this.activities.filter(activity => activity.name.toLowerCase() == this.formAddActivity.value.toLowerCase()).length == 0 ? this.addActivityDisabled = false : this.addActivityDisabled = true;
  }

  onAddCountry() {
    this.countries.push({
      id: Number(),
      name: this.formAddCountry.value
    });
    this.newCountry = true;
  }

  onEditAddCountry() {
    console.log(this.countries)
    console.log("the country" + this.formAddCountry.value)
    this.countries.filter(country => country.name.toLowerCase() == this.formAddCountry.value.toLowerCase()).length == 0 ? this.addCountryDisabled = false : this.addCountryDisabled = true;
  }

}
