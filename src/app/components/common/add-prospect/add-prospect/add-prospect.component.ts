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

  cities!: City[];
  activities!: Activity[];
  countries!: Country[];

  formCity = new FormControl({} as City);
  formActivity = new FormControl({} as Activity);
  formCountry = new FormControl({} as Country);
  formCompanyName = new FormControl("");
  formAddress = new FormControl("");
  formPhone = new FormControl("");
  formEmail = new FormControl("");
  formWebsite = new FormControl("");

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
            this.countries = data;
          },
          error: (err) => {
            console.log(err)
          }
        })
  }

  onCreateProspect() {
    // if(this.cities.filter((city: City) => city.name == this.formCity.value.name))
    this.prospectService.create({
      activity: this.formActivity.value,
      city: this.formCity.value,
      country: this.formCountry.value,
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
      comment: "",
      nbNo: 0,
      disabled: false,
      isBookmarked: false
    });
    console.log(this.formActivity.value)
    console.log(this.formCity.value)
    console.log(this.formAddress.value)
    console.log(this.formCompanyName.value)
    console.log(this.formCountry.value)
    console.log(this.formEmail.value)
    console.log(this.formPhone.value)
    console.log(this.formWebsite.value)
  }
}
