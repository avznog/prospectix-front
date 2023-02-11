import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReasonDisabledType } from 'src/app/constants/reasonDisabled.type';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { MailTemplatesService } from 'src/app/services/mail-templates/mail-templates.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
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
    private readonly sentEmailService: SentEmailsService
  ) { }

  ngOnInit(): void {
    this.currentTemplate = localStorage.getItem("currentTemplate") != 'creation' ? JSON.parse(localStorage.getItem("currentTemplate")!) : 'creation' ?? 'creation';
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
        "activity": {
          "id": -1,
          "name": ""
        },
        "city": {
          "id": 2,
          "name": "Angers",
          "zipcode": 49000
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
