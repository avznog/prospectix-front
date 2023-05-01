import { Component, Input, OnInit } from '@angular/core';
import { SecondaryActivity } from 'src/app/models/secondary-activity.model';
import { City } from 'src/app/models/city.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { SentEmail } from 'src/app/models/sent-email.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { PrimaryActivity } from 'src/app/models/primary-activity.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DataThemeService } from 'src/app/services/common/data-theme.service';

@Component({
  selector: 'app-prospect-edit',
  templateUrl: './prospect-edit.component.html',
  styleUrls: ['./prospect-edit.component.scss']
})
export class ProspectEditComponent implements OnInit {

  data: {
    prospect?: Prospect;
    sentEmail?: SentEmail;
    reminder?: Reminder;
  } = {};

  primaryActivity: PrimaryActivity | null = null;
  secondaryActivity: SecondaryActivity | null = null;

  city: City | null = null;
  phone: string = "";
  email: string = "";
  website: string = "";
  companyName: string = "";
  streetAddress: string = "";
  
  constructor(
    private readonly prospectsService: ProspectsService,
    public readonly citiesService: CitiesService,
    public readonly activitiesService: ActivitiesService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailService: SentEmailsService,
    private readonly ngxSmartModalService: NgxSmartModalService,
    public readonly dataThemeService: DataThemeService
  ) {
    
   }

  ngOnInit(): void {
    this.data = this.ngxSmartModalService.getModalData('prospect-edit')
    this.streetAddress = this.data.prospect!.streetAddress;
    this.companyName = this.data.prospect!.companyName;
    this.phone = this.data.prospect!.phone.number;
    this.website = this.data.prospect!.website.website;
    this.email = this.data.prospect!.email.email;
  }

  onEditProspect() {
    const edit = {
    companyName: this.companyName,
    streetAddress: this.streetAddress,
    city: this.city == undefined ? this.data.prospect!.city || this.data.reminder!.prospect.city || this.data.sentEmail!.prospect.city : this.city,
    secondaryActivity: !this.primaryActivity || !this.secondaryActivity ? (this.data.prospect!.secondaryActivity || this.data.reminder!.prospect.secondaryActivity || this.data.sentEmail!.prospect.secondaryActivity) : { ...this.secondaryActivity, primaryActivity: this.primaryActivity },
    version: this.data.prospect!.version || this.data.reminder!.prospect.version || this.data.sentEmail!.prospect.version,
    dateScraped: this.data.prospect!.dateScraped || this.data.reminder!.prospect.dateScraped || this.data.sentEmail!.prospect.dateScraped,
    phone: {
      id: this.data.prospect!.phone.id,
      number: this.phone
    },
    website: {
      id: this.data.prospect!.website.id,
      website: this.website
    },
    email: {
      id: this.data.prospect!.email.id,
      email: this.email
    }
  };

    this.prospectsService.updateAllProspect(this.data.prospect!.id, edit);
    this.remindersService.updateLiveProspect({ ...this.data.prospect!, ...edit });
    this.meetingsService.updateLiveProspect({ ...this.data.prospect!, ...edit });
    this.bookmarksService.updateLiveProspect({ ...this.data.prospect!, ...edit });
    this.sentEmailService.updateLiveProspect({ ...this.data.prospect!, ...edit })
    if(this.data.reminder) {
      this.remindersService.reminders.set(this.data.reminder!.id, { ...this.data.reminder!, prospect: { ...this.data.reminder!.prospect, ...edit}})
    }

    if(this.data.sentEmail) {
      this.sentEmailService.sentEmails.set(this.data.sentEmail!.id, { ...this.data.sentEmail!, prospect: { ...this.data.sentEmail!.prospect, ...edit}})
    }
    this.ngxSmartModalService.closeAll();
  }
}
