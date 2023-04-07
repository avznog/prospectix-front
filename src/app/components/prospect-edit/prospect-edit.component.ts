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

@Component({
  selector: 'app-prospect-edit',
  templateUrl: './prospect-edit.component.html',
  styleUrls: ['./prospect-edit.component.scss']
})
export class ProspectEditComponent implements OnInit {

  @Input() prospect!: Prospect;
  @Input() sentEmail!: SentEmail;
  @Input() reminder!: Reminder;

  primaryActivity: PrimaryActivity | null = null;
  secondaryActivity: SecondaryActivity | null = null;

  city!: City;
  phone: string = "";
  email: string = "";
  website: string = "";
  companyName: string = "";
  streetAddress: string = "";
  
  constructor(
    private readonly prospectsService: ProspectsService,
    public citiesService: CitiesService,
    public activitiesService: ActivitiesService,
    private remindersService: RemindersService,
    private meetingsService: MeetingsService,
    private bookmarksService: BookmarksService,
    private sentEmailService: SentEmailsService
  ) {
    
   }

  ngOnInit(): void {
    this.streetAddress = this.prospect.streetAddress;
    this.companyName = this.prospect.companyName;
    this.phone = this.prospect.phone.number;
    this.website = this.prospect.website.website;
    this.email = this.prospect.email.email;
  }

  onEditProspect() {
    const edit = {
    companyName: this.companyName,
    streetAddress: this.streetAddress,
    city: this.city == undefined ? this.prospect.city || this.reminder.prospect.city || this.sentEmail.prospect.city : this.city,
    secondaryActivity: !this.primaryActivity || !this.secondaryActivity ? (this.prospect.secondaryActivity || this.reminder.prospect.secondaryActivity || this.sentEmail.prospect.secondaryActivity) : { ...this.secondaryActivity, primaryActivity: this.primaryActivity },
    phone: {
      id: this.prospect.phone.id,
      number: this.phone
    },
    website: {
      id: this.prospect.website.id,
      website: this.website
    },
    email: {
      id: this.prospect.email.id,
      email: this.email
    }
  };

    this.prospectsService.updateAllProspect(this.prospect.id, edit);
    this.remindersService.updateLiveProspect({ ...this.prospect, ...edit });
    this.meetingsService.updateLiveProspect({ ...this.prospect, ...edit });
    this.bookmarksService.updateLiveProspect({ ...this.prospect, ...edit });
    this.sentEmailService.updateLiveProspect({ ...this.prospect, ...edit })
    if(this.reminder) {
      this.remindersService.reminders.set(this.reminder.id, { ...this.reminder, prospect: { ...this.reminder.prospect, ...edit}})
    }

    if(this.sentEmail) {
      this.sentEmailService.sentEmails.set(this.sentEmail.id, { ...this.sentEmail, prospect: { ...this.sentEmail.prospect, ...edit}})
    }
  }
}
