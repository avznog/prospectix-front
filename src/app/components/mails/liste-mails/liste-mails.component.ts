import { Component, OnInit } from '@angular/core';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';

@Component({
  selector: 'app-liste-mails',
  templateUrl: './liste-mails.component.html',
  styleUrls: ['./liste-mails.component.scss']
})
export class ListeMailsComponent implements OnInit {

  constructor(
    public readonly sentEmailsService: SentEmailsService
  ) { }

  ngOnInit(): void {
  }

}
