import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/auth.service';
import { ReasonDisabledType } from 'src/app/constants/reasonDisabled.type';
import { VersionCityType, VersionPrimaryActivityType, VersionProspectType, VersionSecondaryActivityType } from 'src/app/constants/versions.type';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { MailTemplatesService } from 'src/app/services/mail-templates/mail-templates.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { ActionProspectComponent } from '../../common/action-prospect/action-prospect.component';

@Component({
  selector: 'app-mail-templates',
  templateUrl: './mail-templates.component.html',
  styleUrls: ['./mail-templates.component.scss'],
})
export class MailTemplatesComponent implements OnInit {
  htmlContent: string = ""
  currentTemplate: MailTemplate | "creation" = "creation";
  name: string = ""
  editMode: boolean = false;
  placeholder: string = `Ecrivez votre mail ici, la forme sera conservée. Le "Bonjour M. Nom du client" sera mis automatiquement, ne le mettez donc pas dans votre template.`
  constructor(
    public readonly mailTemplatesService: MailTemplatesService,
    public readonly authService: AuthService,
    private readonly sentEmailService: SentEmailsService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.currentTemplate = localStorage.getItem("currentTemplate") != 'creation' ? JSON.parse(localStorage.getItem("currentTemplate")!) : 'creation' ?? 'creation';
    this.ngxSmartModalService.create('action-prospect', ActionProspectComponent).addCustomClass('action-prospect').closable = false;
  }

  changeTemplate(mailTemplate: MailTemplate | "creation") {
    this.editMode = false;
    this.currentTemplate = mailTemplate;
    this.htmlContent = "";
    localStorage.setItem("currentTemplate", JSON.stringify(mailTemplate));
  }

  onCreateTemplate() {
    this.mailTemplatesService.create({
      name: this.name,
      content: this.htmlContent
    }).add(() => {
      this.mailTemplatesService.myTemplates.forEach((value, key) => {
        if(value.name == this.name) {
          this.changeTemplate(value);
        }
      })
    });
   }

   updateMailTemplate() {
    this.currentTemplate != 'creation' && this.mailTemplatesService.update(this.currentTemplate.id, {
      content: this.htmlContent,
    }) && (this.currentTemplate.content = this.htmlContent);
   }

  //  ? Send test mail
   onSendTestMail() {
    this.sentEmailService.send({
      clientName: "M. Taliafiko",
      mailTemplateId: this.currentTemplate != 'creation' ? this.currentTemplate.id : 0,
      object: "[TEST] Retour sur notre appel",
      withPlaquetteJisep: true,
      withPlaquetteSkema: true,
      prospect: {
        "id": 256,
        "companyName": "S.a.e.m.o La Roseraie",
        "streetAddress": "8 rue Luther King",
        "isBookmarked": false,
        "comment": "",
        "nbNo": 0,
        "disabled": false,
        "stage": 0,
        "archived": new Date(),
        "reasonDisabled": ReasonDisabledType.ENTREPRISE_FERMEE,
        "version": VersionProspectType.V2,
        "dateScraped": new Date,
        "secondaryActivity": {
          "id": -1,
          "name": "",
          "weight": 0,
          "version": VersionSecondaryActivityType.V2,
          "weightCount": 0,
          "dateScraped": new Date,
          "primaryActivity": {
            "id": -1,
            "name": "",
            "weight": 0,
            "secondaryActivities": [],
            "weightCount": 0,
            "dateScraped": new Date,
            "version": VersionPrimaryActivityType.V2
          }
        },
        "city": {
          "id": 2,
          "name": "Angers",
          "zipcode": 49000,
          "dateScraped": new Date,
          "version": VersionCityType.V2,
          "origin": ""
        },
        "country": {
          "id": 1,
          "name": "France"
        },
        "events": [],
        "meetings": [],
        "phone": {
          "id": -1,
          "number": "00 00 00 11 22"
        },
        "reminders": [],
        "website": {
          "id": -1,
          "website": ""
        },
        "email": {
          "id": -1,
          "email": this.authService.currentUserSubject.getValue().mail
        },
        "bookmarks": []
      }
    
    }, 
    -1)
   }
}
