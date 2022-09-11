import { Component, Input, OnInit } from '@angular/core';
import { SentEmail } from 'src/app/models/sent-email.model';

@Component({
  selector: 'app-each-mail',
  templateUrl: './each-mail.component.html',
  styleUrls: ['./each-mail.component.scss']
})
export class EachMailComponent implements OnInit {

  @Input() sentEmail!: SentEmail;
  constructor() { }

  ngOnInit(): void {
  }

}
