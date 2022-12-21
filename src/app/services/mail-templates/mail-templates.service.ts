import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { CreateMailTemplateDto } from 'src/app/dto/mail-templates/create-mail-template.dto';
import { updateMailTemplateDto } from 'src/app/dto/mail-templates/update-mail-template.dto';
import { ToastsService } from '../toasts/toasts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MailTemplatesService {

  myTemplates = new Map<number, MailTemplate>();
  allTemplates = new Map<number, MailTemplate>();
  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService,
    private readonly authService: AuthService
  ) { 
    this.findAllForMe();
    this.findAll();
  }

  findAllForMe() {
    return this.http.get<MailTemplate[]>(`mail-templates`).subscribe(mailTemplates => mailTemplates.forEach(mailTemplate => this.myTemplates.set(mailTemplate.id, mailTemplate)));
  }

  create(createMailTemplateDto: CreateMailTemplateDto) {
    return this.http.post<MailTemplate>(`mail-templates`, createMailTemplateDto).subscribe(mailTemplate => {
      this.myTemplates.set(mailTemplate.id, mailTemplate)
      this.toastsService.addToast({
        type: "alert-success",
        message: `Mail template ${createMailTemplateDto.name} créé`
      });
    });
  }

  delete(id: number) {
    return this.http.delete(`mail-templates/${id}`).subscribe(() => {
      const mailTemplateName = this.myTemplates.get(id)?.name;
      this.myTemplates.delete(id)
      console.log(this.myTemplates)
      this.toastsService.addToast({
        type: "alert-error",
        message: `Mail Template ${mailTemplateName} supprimé`
      })
    });
  }

  update(id: number, updateMailTemplateDto: updateMailTemplateDto) {
    return this.http.patch<MailTemplate>(`mail-templates/${id}`, updateMailTemplateDto).subscribe(mailTemplate => {
      this.myTemplates.set(id, mailTemplate)
      console.log(mailTemplate)
      this.toastsService.addToast({
        type: "alert-info",
        message: `Mail Template ${this.myTemplates.get(id)?.name} modifé`
      });
    });
  }

  findAll() {
    return this.http.get<MailTemplate[]>(`mail-templates/all`).subscribe(mailTemplates => {
      mailTemplates = mailTemplates.filter(mailtemplate => mailtemplate.pm.id != this.authService.currentUserSubject.getValue().id)
      mailTemplates.forEach(mailTemplate => this.allTemplates.set(mailTemplate.id, mailTemplate));
    })
  }

}
