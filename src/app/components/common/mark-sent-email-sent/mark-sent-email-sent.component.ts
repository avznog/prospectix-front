import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { Prospect } from 'src/app/models/prospect.model';
import { SentEmail } from 'src/app/models/sent-email.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { GoogleService } from 'src/app/services/google/google.service';
import { MailTemplatesService } from 'src/app/services/mail-templates/mail-templates.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'app-mark-sent-email-sent',
  templateUrl: './mark-sent-email-sent.component.html',
  styleUrls: ['./mark-sent-email-sent.component.scss']
})
export class MarkSentEmailSentComponent implements OnInit {

  @Input() sentEmail!: SentEmail;
  @Input() prospect!: Prospect;
  clientName: string =  "";
  chosenTemplate: MailTemplate = undefined as unknown as MailTemplate;
  object: string = "";
  withPlaquette: boolean = true;
  correctEmail : boolean = false;
  email: string = "";
  emailGotChanged: boolean = false;

  constructor(
    private readonly prospectService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
    public readonly mailTemplatesService: MailTemplatesService,
    public readonly googleService: GoogleService,
    private readonly toastsService: ToastsService,
    private readonly prospectsService: ProspectsService,
  ) { }

  ngOnInit(): void {
    this.email = this.prospect.email.email;
    this.checkFormatEmail();
  }

  onClickMarkSentEmailSent() {
    if(this.googleService.logged) {
      this.emailGotChanged && this.updateEmailOnProspect();
      this.sentEmailsService.send({
        clientName: this.clientName,
        mailTemplateId: this.chosenTemplate.id,
        prospect: {
          ...this.prospect,
          email: {
            id: this.prospect.email.id,
            email: this.email
          }
        },
        object: "[Junior ISEP] " + this.object,
        withPlaquette: this.withPlaquette
      },
      this.sentEmail.id);
  
      this.prospectService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
      this.remindersService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
      this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
      this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
      this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
  
      this.eventsService.create({
        type: EventType.MARK_MAIL_SENT,
        date: new Date,
        description: `${EventDescriptionType.MARK_MAIL_SENT} ${this.authService.currentUserSubject.getValue().pseudo} avec le template ${this.chosenTemplate.name}`,
        pm: this.authService.currentUserSubject.getValue(),
        prospect: this.prospect
      });
    } else {
      this.toastsService.addToast({
        type: 'alert-error',
        message: 'Connexion à Google requise'
      });
      this.googleService.authenticate();
    }
  }

  onClickSendMailSeparately() {
    this.emailGotChanged && this.updateEmailOnProspect();
    this.sentEmailsService.sendSeparately(this.sentEmail.id, this.object);
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
    this.remindersService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
    this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
    this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });
    this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.MAIL_SENT });

    this.eventsService.create({
      type: EventType.MARK_MAIL_SENT,
      date: new Date,
      description: `${EventDescriptionType.MARK_MAIL_SENT} ${this.authService.currentUserSubject.getValue().pseudo} séparément`,
      pm: this.authService.currentUserSubject.getValue(),
      prospect: this.prospect
    });
  }

  checkFormatEmail() {
    console.log(this.emailGotChanged)
    new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}").test(this.email) ? this.correctEmail = true : this.correctEmail = false;
  }

  updateEmailOnProspect() {
    const edit = {
      email: {
        id: this.prospect.email.id,
        email: this.email
      }
    };
  
    this.prospectsService.updateAllProspect(this.prospect.id, edit);
    this.remindersService.updateLiveProspect({ ...this.prospect, ...edit });
    this.meetingsService.updateLiveProspect({ ...this.prospect, ...edit });
    this.bookmarksService.updateLiveProspect({ ...this.prospect, ...edit });
    this.sentEmailsService.updateLiveProspect({ ...this.prospect, ...edit });
    this.sentEmailsService.sentEmails.set(this.sentEmail.id, { ...this.sentEmail, prospect: { ...this.sentEmail.prospect, ...edit}})

  }
}
