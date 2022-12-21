import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { CreateMailTemplateDto } from 'src/app/dto/mail-templates/create-mail-template.dto';
import { updateMailTemplateDto } from 'src/app/dto/mail-templates/update-mail-template.dto';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class MailTemplatesService {

  myTemplates = new Map<number, MailTemplate>();
  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService
  ) { 
    this.findAllForMe();
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
    return this.http.delete(`mail-templates/${id}`).subscribe(() => this.myTemplates.delete(id));
  }

  update(id: number, updateMailTemplateDto: updateMailTemplateDto) {
    return this.http.patch<MailTemplate>(`mail-templates/${id}`, updateMailTemplateDto).subscribe(mailTemplate => this.myTemplates.set(id, { ...this.myTemplates.get(id)!, ...updateMailTemplateDto}));
  }

}
