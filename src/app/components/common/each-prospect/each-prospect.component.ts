import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { WebsitesService } from 'src/app/services/websites/websites.service';

@Component({
  selector: 'app-each-prospect',
  templateUrl: './each-prospect.component.html',
  styleUrls: ['./each-prospect.component.scss']
})
export class EachProspectComponent implements OnInit {
  @Input() prospect!: Prospect;
  @Input() currentCity!: City;
  @Input() priority!: number;
  @Input() reminder!: Reminder;
  @Input() remindersDone!: boolean;
  @Input() futureReminders!: boolean;
  @Input() previousReminders!: boolean;
  today = new Date();
  changeNumberForm!: FormGroup;
  changeEmailForm!: FormGroup;
  changeWebsiteForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private phonesService: PhonesService,
    private websitesService: WebsitesService,
    private emailsService: EmailsService,
    private remindersService: RemindersService
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
    if(this.prospect){
      console.log("mode prospect")
      return this.phonesService.updatePhoneNumber(this.prospect.phone.id, { number: this.changeNumberForm.value["number"]});
    }else {
      console.log("mode reminder")
      return this.phonesService.updatePhoneNumber(this.reminder.prospect.id, { number: this.changeNumberForm.value["number"]});
    }
    
  }

  onChangeEmail() : Subscription {
    console.log("email changed")
    if(this.prospect){
      return this.emailsService.updateEmail(this.prospect.email.id, { email: this.changeEmailForm.value["email"] });
    } else {
      return this.emailsService.updateEmail(this.reminder.prospect.id, { email: this.changeEmailForm.value["email"]});
    }
  }

  onChangeWebsite() : Subscription {
    console.log("website changed")
    if(this.prospect) {
      return this.websitesService.updateWebsite(this.prospect.website.id, { website: this.changeWebsiteForm.value["website"] });
    } else {
      return this.websitesService.updateWebsite(this.reminder.prospect.id, { website: this.changeWebsiteForm.value["website"]});
    }
  }

  onDeleteReminder(idReminder: number) : Subscription {
    console.log("reminder deleted")
    return this.remindersService.deleteReminder(idReminder);
  }

  onMarkDone(idreminder: number) : Subscription {
    console.log("reminder marked done");
    return this.remindersService.markDone(idreminder);
  }

  onMarkUndone(idReminder: number) : Subscription {
    console.log("reminder marked undone");
    return this.remindersService.markUndone(idReminder);
  }
}
