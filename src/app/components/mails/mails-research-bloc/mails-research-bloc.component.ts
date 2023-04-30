import { Component, OnInit } from '@angular/core';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';

@Component({
  selector: 'app-mails-research-bloc',
  templateUrl: './mails-research-bloc.component.html',
  styleUrls: ['./mails-research-bloc.component.scss']
})
export class MailsResearchBlocComponent implements OnInit {

  sent: boolean = false;
  keyword: string | null = null;

  constructor(
    private readonly sentEmailsService: SentEmailsService
  ) { }

  ngOnInit(): void {
    this.sent = this.sentEmailsService.researchParamsSentEmails.sent == 1 ? true : false;
  }

  updateParameters() {
    this.sentEmailsService.resetSearch({
      ...this.sentEmailsService.researchParamsSentEmails,
      sent: this.sent ? 1 : 0,
      keyword: this.keyword != '' ? this.keyword : null
    })
  }

}
