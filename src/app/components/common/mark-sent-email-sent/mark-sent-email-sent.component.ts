import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { Prospect } from 'src/app/models/prospect.model';
import { SentEmail } from 'src/app/models/sent-email.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { DataThemeService } from 'src/app/services/common/data-theme.service';
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

  data: {
    sentEmail?: SentEmail;
    prospect?: Prospect;
  } = {};

  clientName: string =  "";
  chosenTemplate: MailTemplate = undefined as unknown as MailTemplate;
  object: string = "";
  withPlaquetteJisep: boolean = true;
  withPlaquetteSkema: boolean = true;
  correctEmail : boolean = false;
  email: string = "";
  emailGotChanged: boolean = false;
  contentModified: string = "";

  constructor(
    private readonly prospectService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
    private readonly toastsService: ToastsService,
    private readonly prospectsService: ProspectsService,
    public readonly mailTemplatesService: MailTemplatesService,
    public readonly googleService: GoogleService,
    public readonly ngxSmartModalService: NgxSmartModalService,
    public readonly dataThemeService: DataThemeService
  ) { }

  ngOnInit(): void {
    this.data = this.ngxSmartModalService.getModalData('mail-sent');
    this.email = this.data.prospect!.email.email;
    this.checkFormatEmail();
  }

  onClickMarkSentEmailSent() {
    if(this.googleService.logged) {
      this.emailGotChanged && this.updateEmailOnProspect();
      const sendEmailDto = {
        clientName: this.clientName,
        mailTemplateId: this.chosenTemplate.id,
        prospect: {
          ...this.data.prospect!,
          email: {
            id: this.data.prospect!.email.id,
            email: this.email
          }
        },
        object: "[Junior ISEP] " + this.object,
        withPlaquetteJisep: this.withPlaquetteJisep,
        withPlaquetteSkema: this.withPlaquetteSkema
      };

      let emailToSend = undefined;
      if(this.contentModified != this.chosenTemplate.content) {
        emailToSend = { ...sendEmailDto, mailTemplateModified: this.contentModified};
      } else {
        emailToSend = sendEmailDto;
      }
      this.sentEmailsService.send(emailToSend, this.data.sentEmail!.id);
  
      this.prospectService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
      this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
      this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
      this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
      this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
  
      this.eventsService.create({
        type: EventType.MARK_MAIL_SENT,
        date: new Date,
        description: `${EventDescriptionType.MARK_MAIL_SENT} ${this.authService.currentUserSubject.getValue().pseudo} avec le template ${this.chosenTemplate.name}`,
        pm: this.authService.currentUserSubject.getValue(),
        prospect: this.data.prospect!
      });
    } else {
      this.toastsService.addToast({
        type: 'alert-error',
        message: 'Connexion à Google requise'
      });
      this.googleService.authenticate();
    }
    this.ngxSmartModalService.closeAll();
  }

  onClickSendMailSeparately() {
    this.emailGotChanged && this.updateEmailOnProspect();
    this.sentEmailsService.sendSeparately(this.data.sentEmail!.id, this.object);
    this.prospectService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
    this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
    this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
    this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });
    this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.MAIL_SENT });

    this.eventsService.create({
      type: EventType.MARK_MAIL_SENT,
      date: new Date,
      description: `${EventDescriptionType.MARK_MAIL_SENT} ${this.authService.currentUserSubject.getValue().pseudo} séparément`,
      pm: this.authService.currentUserSubject.getValue(),
      prospect: this.data.prospect!
    });
    this.ngxSmartModalService.closeAll();
  }

  checkFormatEmail() {
    new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(this.email) ? this.correctEmail = true : this.correctEmail = false;
  }

  updateEmailOnProspect() {
    const edit = {
      email: {
        id: this.data.prospect!.email.id,
        email: this.email
      }
    };
  
    this.prospectsService.updateAllProspect(this.data.prospect!.id, edit);
    this.remindersService.updateLiveProspect({ ...this.data.prospect!, ...edit });
    this.meetingsService.updateLiveProspect({ ...this.data.prospect!, ...edit });
    this.bookmarksService.updateLiveProspect({ ...this.data.prospect!, ...edit });
    this.sentEmailsService.updateLiveProspect({ ...this.data.prospect!, ...edit });
    this.sentEmailsService.sentEmails.set(this.data.sentEmail!.id, { ...this.data.sentEmail!, prospect: { ...this.data.sentEmail!.prospect, ...edit}})

  }

  templateChanged() {
    this.chosenTemplate && (this.contentModified = this.chosenTemplate.content);
  } 
}
