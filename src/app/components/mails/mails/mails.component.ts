import { Component, OnInit } from '@angular/core';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit {

  constructor(
    public readonly sentEmailsService: SentEmailsService
  ) { }

  ngOnInit(): void {
  }

  pageDown() {
    this.sentEmailsService.updateSearchParameters({
      ...this.sentEmailsService.researchParamsSentEmails,
      skip: this.sentEmailsService.researchParamsSentEmails.skip - 20
    })
  }

  pageUp() {
    this.sentEmailsService.updateSearchParameters({
      ...this.sentEmailsService.researchParamsSentEmails,
      skip: this.sentEmailsService.researchParamsSentEmails.skip + 20
    })
  }

  // ? order chronological -> the furthest on top
  asIsOrder() {
    return -1;
  }
}
