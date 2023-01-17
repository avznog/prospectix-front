import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { MailTemplatesService } from 'src/app/services/mail-templates/mail-templates.service';
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
    public readonly authService: AuthService
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
}
