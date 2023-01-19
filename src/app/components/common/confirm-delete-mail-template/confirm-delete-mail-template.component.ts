import { Component, Input, OnInit } from '@angular/core';
import { MailTemplate } from 'src/app/models/mail-template.model';
import { MailTemplatesService } from 'src/app/services/mail-templates/mail-templates.service';

@Component({
  selector: 'app-confirm-delete-mail-template',
  templateUrl: './confirm-delete-mail-template.component.html',
  styleUrls: ['./confirm-delete-mail-template.component.scss']
})
export class ConfirmDeleteMailTemplateComponent implements OnInit {

  @Input() mailTemplate!: MailTemplate;
  constructor(
    private readonly mailTemplatesService: MailTemplatesService
  ) { }

  ngOnInit(): void {
  }

  onDeleteMailTemplate() {
    this.mailTemplatesService.delete(this.mailTemplate.id)
  }
}
