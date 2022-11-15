import { Component, OnInit } from '@angular/core';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';

@Component({
  selector: 'app-mails-research-bloc',
  templateUrl: './mails-research-bloc.component.html',
  styleUrls: ['./mails-research-bloc.component.scss']
})
export class MailsResearchBlocComponent implements OnInit {

  sent: boolean = false;

  constructor(
    private readonly sentEmailsService: SentEmailsService
  ) { }

  ngOnInit(): void {
    this.sent = this.sentEmailsService.researchParamsSentEmails.sent;
  }

  onEditSent() {
    this.sentEmailsService.resetSearch({
      sent: this.sent,
      take: 20,
      skip: 0
    })
  }

}
