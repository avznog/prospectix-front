import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { StageType } from 'src/app/constants/stage.type';
import { CreateProspectDto } from 'src/app/dto/prospects/create-prospect.dto';
import { City } from 'src/app/models/city.model';
import { Country } from 'src/app/models/country.model';
import { PrimaryActivity } from 'src/app/models/primary-activity.model';
import { SecondaryActivity } from 'src/app/models/secondary-activity.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { SearchParamsService } from 'src/app/services/search-params/search-params.service';
import { AddCityComponent } from '../add-city/add-city.component';

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss']
})
export class AddProspectComponent implements OnInit {

  constructor(
    private readonly prospectService: ProspectsService,
    private readonly searchParamsService: SearchParamsService,
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    public readonly countriesService: CountriesService,
    public readonly bookmarksService: BookmarksService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }
  
  city!: City;  

  primaryActivity: PrimaryActivity | null = null;
  secondaryActivity: SecondaryActivity | null = null;

  country: Country = {} as Country;
  stage: StageType = StageType.BOOKMARK;
  createProspectDto: CreateProspectDto = {} as CreateProspectDto

  // Prospect
  companyName: string = "";
  address: string = "";
  phone: string = "";
  email: string = "";
  website: string = "";
  comment: string = "";

  ngOnInit(): void {  
    this.country = {
      name: "France",
      id: 1
    }
    this.ngxSmartModalService.create('add-city', AddCityComponent);
  }

  onCreateProspect() {
    (this.stage != 2 && this.stage != 3) && this.prospectService.create({
      secondaryActivity: {
        ...this.secondaryActivity!,
        primaryActivity: this.primaryActivity!
      },
      city: this.city,
      country: this.country,
      stage: this.stage,
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
      dateScraped: new Date,
      version: this.searchParamsService.searchParams.versionProspect,
      streetAddress: this.address,
      comment: this.comment,
      nbNo: 0,
      disabled: false,
      isBookmarked: false,
    });

    (this.stage == 2 || this.stage == 3) && this.ngxSmartModalService.getModal('add-meeting-reminder').removeData().setData({
      type: this.stage == 2 ? 'reminder' : 'meeting',
      createProspectDto: {
        secondaryActivity: {
          ...this.secondaryActivity!,
          primaryActivity: this.primaryActivity!
        },
        city: this.city,
        country: this.country,
        stage: this.stage,
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
        isBookmarked: false,
        version: this.searchParamsService.searchParams.versionProspect,
        dateScraped: new Date
      }
    }).open()

    this.stage != 2 && this.stage != 3 && this.ngxSmartModalService.closeAll();
  }
}
