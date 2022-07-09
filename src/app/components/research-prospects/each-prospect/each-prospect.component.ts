import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { Prospect } from 'src/app/models/prospect.model';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { WebsitesService } from 'src/app/services/websites/websites.service';
import { ResearchBlocComponent } from '../research-bloc/research-bloc.component';

@Component({
  selector: 'app-each-prospect',
  templateUrl: './each-prospect.component.html',
  styleUrls: ['./each-prospect.component.scss']
})
export class EachProspectComponent implements OnInit {
  @Input() prospect!: Prospect;
  @Input() currentCity!: City;
  changeNumberForm!: FormGroup;
  changeEmailForm!: FormGroup;
  changeWebsiteForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private phonesService: PhonesService,
    private websitesService: WebsitesService,
    private emailsService: EmailsService,
    
  ) { }

  ngOnInit(): void {
    this.changeNumberForm = this.formBuilder.group({
      number: ["", Validators.required]
    });

    this.changeEmailForm = this.formBuilder.group({
      email: ["", Validators.required]
    });

    this.changeWebsiteForm = this.formBuilder.group({
      website: ["", Validators.required]
    })
  }

  onChangePhoneNumber() : Subscription {
    console.log("phone changed")
    return this.phonesService.updatePhoneNumber(this.prospect.phone.id, { number: this.changeNumberForm.value["number"]});
  }

  onChangeEmail() : Subscription {
    console.log("email changed")
    return this.emailsService.updateEmail(this.prospect.email.id, { email: this.changeEmailForm.value["email"] });
  }

  onChangeWebsite() : Subscription {
    console.log("website changed")
    return this.websitesService.updateWebsite(this.prospect.website.id, { website: this.changeWebsiteForm.value["website"] });
  }
}
