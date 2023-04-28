import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MailTemplatesService } from 'src/app/services/mail-templates/mail-templates.service';

@Component({
  selector: 'app-confirm-delete-mail-template',
  templateUrl: './confirm-delete-mail-template.component.html',
  styleUrls: ['./confirm-delete-mail-template.component.scss']
})
export class ConfirmDeleteMailTemplateComponent implements OnInit {

  data: {
     mailTemplate?: {
      name: string;
      id: number;
     }
  } = {};
  constructor(
    private readonly mailTemplatesService: MailTemplatesService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.data = this.ngxSmartModalService.getModalData('delete-mail-template');
  }

  onDeleteMailTemplate() {
    this.mailTemplatesService.delete(this.data.mailTemplate?.id!)
    this.ngxSmartModalService.closeAll();
  }
}
