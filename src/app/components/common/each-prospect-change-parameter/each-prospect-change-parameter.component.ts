import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { WebsitesService } from 'src/app/services/websites/websites.service';

@Component({
  selector: 'app-each-prospect-change-parameter',
  templateUrl: './each-prospect-change-parameter.component.html',
  styleUrls: ['./each-prospect-change-parameter.component.scss']
})
export class EachProspectChangeParameterComponent implements OnInit {

  @Input() valueToDisplay!: string;
  @Input() prospect!: Prospect;
  @Input() meeting!: Meeting;
  @Input() reminder!: Reminder;
  @Input() el!: string;
  @Input() id!: number;
  isClicked: boolean = Boolean();
  element: string = "";

  constructor(
    private readonly phonesService: PhonesService,
    private readonly emailsService: EmailsService,
    private readonly websitesService: WebsitesService
  ) { }

  ngOnInit(): void {
  }

  onChangeElement() : Subscription {
    if(this.el == "phone") {
      return this.phonesService.updatePhoneNumber(this.id, { number: this.element});
    } else if (this.el == "email") {
      return this.emailsService.updateEmail(this.id, { email: this.element });
    } else {
      return this.websitesService.updateWebsite(this.id, { website: this.element });
    }
  }

  onClickValueToDisplay() {
    if(this.el == "website") {
      window.open(`http://${this.valueToDisplay}`, "_blank")
    } else if (this.el == "email") {
      window.open(`mailto:${this.valueToDisplay}`, "_blank")
    } else {
      window.open(`tel:${this.valueToDisplay}`, "_blank")
    }
  }
}
