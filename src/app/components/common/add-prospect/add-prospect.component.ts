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
  
  city: City = {} as City;  
  activity: Activity = {} as Activity;
  country: Country = {} as Country;

  // Prospect
  companyName: string = "";
  address: string = "";
  phone: string = "";
  email: string = "";
  website: string = "";
  comment: string = "";

  ngOnInit(): void {
    this.city = this.citiesService.cities[0];
    this.activity = this.activitiesService.activities[0];
    this.country = this.countriesService.countries[0];
  }

  onCreateProspect() {
    this.prospectService.create({
      activity: this.activity,
      city: this.city,
      country: this.country,
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

  onChangeCity() {
    console.log(this.city)
  }
}
