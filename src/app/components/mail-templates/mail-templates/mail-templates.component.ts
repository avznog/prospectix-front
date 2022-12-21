import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { MailTemplatesService } from 'src/app/services/mail-templates/mail-templates.service';
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-mail-templates',
  templateUrl: './mail-templates.component.html',
  styleUrls: ['./mail-templates.component.scss'],
})
export class MailTemplatesComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    enableToolbar: true,
    height: '50vh',
    minHeight: '10vh',
    placeholder: 'Ecrivez votre mail ici, la forme sera conservée.',
    toolbarHiddenButtons: [
      ['undo', 'redo'],
      ['fontSize', 'insertImage', 'insertVideo']
    ],
    
  };
  htmlContent: string = ""
  currentTemplate: MailTemplate | "creation" = "creation";
  name: string = ""
  editMode: boolean = false;
  constructor(
    public readonly mailTemplatesService: MailTemplatesService
  ) { }

  ngOnInit(): void {
  }

  changeTemplate(mailTemplate: MailTemplate | "creation") {
    this.editMode = false;
    this.currentTemplate = mailTemplate;
    this.htmlContent = "";
  }

  onCreateTemplate() {
    this.mailTemplatesService.create({
      name: this.name,
      content: this.htmlContent
    });
   }

   updateMailTemplate() {
    this.currentTemplate != 'creation' && this.mailTemplatesService.update(this.currentTemplate.id, {
      content: this.htmlContent,
    }) && (this.currentTemplate.content = this.htmlContent);
    
   }
}
