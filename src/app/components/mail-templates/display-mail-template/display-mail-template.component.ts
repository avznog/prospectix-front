import { Component, Input, OnInit } from '@angular/core';
import { MailTemplate } from 'src/app/models/mail-template.model';

@Component({
  selector: 'app-display-mail-template',
  templateUrl: './display-mail-template.component.html',
  styleUrls: ['./display-mail-template.component.scss']
})
export class DisplayMailTemplateComponent implements OnInit {

  @Input() mail_content: string = ""
  @Input() mailTemplate: MailTemplate = {} as MailTemplate;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
