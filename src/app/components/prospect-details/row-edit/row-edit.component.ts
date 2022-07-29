import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UpdateProspectDto } from 'src/app/dto/prospects/update-prospects.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { WebsitesService } from 'src/app/services/websites/websites.service';

@Component({
  selector: 'app-row-edit',
  templateUrl: './row-edit.component.html',
  styleUrls: ['./row-edit.component.scss']
})
export class RowEditComponent implements OnInit {

  @Input() titleRow!: string;
  @Input() prospectVariable!: string;
  @Input() prospect!: Prospect;

  formControl!: FormControl;
  constructor(
    private prospectsService: ProspectsService,
    private phonesService: PhonesService,
    private emailsService: EmailsService,
    private websitesService: WebsitesService
  ) { }

  ngOnInit(): void {
    this.formControl = new FormControl(this.prospectVariable, Validators.required);
  }

  onClickEdit() {

    
    switch(this.titleRow) {

      case "Entreprise":
        this.prospectsService.update(this.prospect.id, {companyName: this.formControl.value} as UpdateProspectDto);
      break;

      case "Addresse":
        this.prospectsService.update(this.prospect.id, {streetAddress: this.formControl.value} as UpdateProspectDto);
      break;

      case "Ville":
        // TODO section !!
        // this.prospectsService.update(1, {city: {id: this.prospect.city.id, name: this.formControl.value}} as UpdateProspectDto);
      break;

      case "Domaine d'activité":
        // TODO section !!
        // this.prospectsService.update(1, {activity: {id: this.prospect.activity.id, name: this.formControl.value}} as UpdateProspectDto);
      break;

      case "Téléphone":
        this.phonesService.updatePhoneNumber(this.prospect.phone.id, {number: this.formControl.value});
      break;

      case "Email":
        this.emailsService.updateEmail(this.prospect.email.id, { email: this.formControl.value });
      break;

      case "Site internet":
        this.websitesService.updateWebsite(this.prospect.website.id, { website: this.formControl.value });
      break;

      default:
        
      break;
    }
    console.log("updated")
    
  }
  
}
