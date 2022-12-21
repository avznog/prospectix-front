import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { MailTemplatesService } from 'src/app/services/mail-templates/mail-templates.service';
@Component({
  selector: 'app-mail-templates',
  templateUrl: './mail-templates.component.html',
  styleUrls: ['./mail-templates.component.scss']
})
export class MailTemplatesComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '50vh',
    minHeight: '10vh',
    placeholder: 'Ecrivez votre mail ici, la forme sera conservée.',
    toolbarHiddenButtons: [
      ['undo', 'redo'],
      ['fontSize', 'insertImage', 'insertVideo']
    ]
  };
  htmlContent: string = ""
  currentTemplate: MailTemplate | "creation" = "creation";
  name: string = ""
  constructor(
    public readonly mailTemplatesService: MailTemplatesService
  ) { }

  ngOnInit(): void {
  }

  changeTemplate(mailTemplate: MailTemplate| "creation") {
    this.currentTemplate = mailTemplate;
  }

  onCreateTemplate() {
    this.mailTemplatesService.create({
      name: this.name,
      content: this.htmlContent
    })
   }
}
