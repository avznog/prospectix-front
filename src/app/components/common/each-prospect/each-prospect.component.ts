import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { PhonesService } from 'src/app/services/phones/phones.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { WebsitesService } from 'src/app/services/websites/websites.service';

@Component({
  selector: 'app-each-prospect',
  templateUrl: './each-prospect.component.html',
  styleUrls: ['./each-prospect.component.scss']
})
export class EachProspectComponent implements OnInit {

  //prospects
  @Input() prospect!: Prospect;
  @Input() currentCity!: City;

  //reminders
  @Input() reminder!: Reminder;
  @Input() priority!: number;
  @Input() remindersDone!: boolean;
  @Input() futureReminders!: boolean;
  @Input() previousReminders!: boolean;
  @Input() date!: Date;
  @Input() remindersDateDown!: Date;
  @Input() remindersDateUp!: Date;

  //meetings
  @Input() meeting!: Meeting;
  @Input() meetingsDone!: boolean;
  @Input() futureMeetings!: boolean;
  @Input() previousMeetings!: boolean;
  @Input() typeMeeting!: string;
  @Input() meetingsDateDown!: Date;
  @Input() meetingsDateUp!: Date;

  today = new Date();

  changeNumberForm!: FormGroup;
  changeEmailForm!: FormGroup;
  changeWebsiteForm!: FormGroup;
  changeCommentForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,

    private phonesService: PhonesService,
    private websitesService: WebsitesService,
    private emailsService: EmailsService,
    private prospectService: ProspectsService,

    private remindersService: RemindersService,
    private meetingsService: MeetingsService
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
    });

    this.changeCommentForm = this.formBuilder.group({
      comment: ["", Validators.required]
    });

  }

  onChangePhoneNumber() : Subscription {
    console.log("phone changed")
    if(this.prospect){
      return this.phonesService.updatePhoneNumber(this.prospect.phone.id, { number: this.changeNumberForm.value["number"]});
    } else if (this.meeting) {
      return this.phonesService.updatePhoneNumber(this.meeting.prospect.id, { number: this.changeNumberForm.value["number"]});
    } else if (this.reminder) {
      return this.phonesService.updatePhoneNumber(this.reminder.prospect.id, { number: this.changeNumberForm.value["number"]});
    } else {
      throw new Error("Impossible de changer le mail");
    }
    
  }

  onChangeEmail() : Subscription {
    console.log("email changed")
    if(this.prospect){
      return this.emailsService.updateEmail(this.prospect.email.id, { email: this.changeEmailForm.value["email"] });
    } else if (this.meeting) {
      return this.emailsService.updateEmail(this.meeting.prospect.id, { email: this.changeEmailForm.value["email"]});
    } else if (this.reminder){
      return this.emailsService.updateEmail(this.reminder.prospect.id, { email: this.changeEmailForm.value["email"]});
    } else {
      throw new Error("Impossible de changer le mail");
    }
  }

  onChangeWebsite() : Subscription {
    console.log("website changed")
    if(this.prospect) {
      return this.websitesService.updateWebsite(this.prospect.website.id, { website: this.changeWebsiteForm.value["website"] });
    } else if (this.meeting) {
      return this.websitesService.updateWebsite(this.meeting.prospect.id, { website: this.changeWebsiteForm.value["website"] });
    } else if (this.reminder) {
      return this.websitesService.updateWebsite(this.reminder.prospect.id, { website: this.changeWebsiteForm.value["website"]});
    } else {
      throw new Error("Impossible de changer le site internet");
    }
  }

  onDeleteReminder(idReminder: number) : Subscription {
    console.log("reminder deleted");
    return this.remindersService.deleteReminder(idReminder);
  }

  onMarkReminderDone(idreminder: number) : Subscription {
    console.log("reminder marked done");
    return this.remindersService.markDone(idreminder);
  }

  onMarkReminderUndone(idReminder: number) : Subscription {
    console.log("reminder marked undone");
    return this.remindersService.markUndone(idReminder);
  }

  
  onDeleteMeeting(idMeeting: number) : Subscription {
    console.log("meeting deleted");
    return this.meetingsService.deleteMeeting(idMeeting);
  }

  onMarkMeetingDone(idMeeting: number) : Subscription {
    console.log("meeting marked done");
    return this.meetingsService.markDone(idMeeting);
  }

  onMarkMeetingUndone(idMeeting: number) : Subscription {
    console.log("meeting marked undone");
    return this.meetingsService.markUndone(idMeeting);
  }

  onClickButtonGoogle() {
    if(this.prospect) {
      window.open(`http://www.google.fr/search?q=${this.prospect.companyName}`, "_blank")
    } else if (this.reminder) {
      window.open(`http://www.google.fr/search?q=${this.reminder.prospect.companyName}`, "_blank")
    } else if (this.meeting) {
      window.open(`http://www.google.fr/search?q=${this.meeting.prospect.companyName}`, "_blank")
    }
  }

  onChangeComment() {
    if(this.changeCommentForm.value["comment"] != ""){
      if(this.prospect) {
        this.prospectService.updateComment(this.prospect.id, { comment: this.changeCommentForm.value["comment"] });
      } else if (this.reminder) {
        this.prospectService.updateComment(this.reminder.prospect.id, { comment: this.changeCommentForm.value["comment"] });
      } else if (this.meeting) {
        this.prospectService.updateComment(this.meeting.prospect.id, { comment: this.changeCommentForm.value["comment"] });
      }
    }
  }

  onChangeNbNo() {
    if(this.prospect) {
      this.prospectService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 });
    } else if (this.reminder) {
      this.prospectService.updateNbNo(this.reminder.prospect.id, { nbNo: this.reminder.prospect.nbNo + 1 });
    } else if (this.meeting) {
      this.prospectService.updateNbNo(this.meeting.prospect.id, { nbNo: this.meeting.prospect.nbNo + 1 });
    }
  }
}
