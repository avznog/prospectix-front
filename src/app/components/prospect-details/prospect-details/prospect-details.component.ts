import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { WebsitesService } from 'src/app/services/websites/websites.service';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrls: ['./prospect-details.component.scss']
})
export class ProspectDetailsComponent implements OnInit {

  @Input() prospect!: Prospect;
  activity: string = "";
  city: string = "";
  phone: string = "";
  email: string = "";
  website: string = "";
  companyName: string = "";
  streetAddress: string = "";
  
  constructor(
    private prospectsService: ProspectsService,
    public citiesService: CitiesService,
    public activitiesService: ActivitiesService,
    private phonesService: PhonesService,
    private emailsService: EmailsService,
    private websitesService: WebsitesService
  ) {
    
   }

  ngOnInit(): void {
    this.activity = this.prospect.city.name;
    this.city = this.prospect.city.name;
    this.phone = this.prospect.phone.number;
    this.email = this.prospect.email.email;
    this.website = this.prospect.website.website;
    this.companyName = this.prospect.companyName;
    this.streetAddress = this.prospect.streetAddress;
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

  onChangePhone() {
    this.phonesService.update(this.prospect, { ...this.prospect.phone, number: this.phone });
  }

  onChangeEmail() {
    this.emailsService.update(this.prospect, { ...this.prospect.email, email: this.email});
  }

  onChangeWebsite() {
    this.websitesService.update(this.prospect, { ...this.prospect.website, website: this.website });
  }

  onChangeCompanyName() {
    this.prospectsService.updateCompanyName(this.prospect.id, { companyName: this.companyName });
  }

  onChangeStreetAddress() {
    this.prospectsService.updateStreetAddress(this.prospect.id, { streetAddress: this.streetAddress });
  }
}
