import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-mail-template',
  templateUrl: './display-mail-template.component.html',
  styleUrls: ['./display-mail-template.component.scss']
})
export class DisplayMailTemplateComponent implements OnInit {

  @Input() mail_content: string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
