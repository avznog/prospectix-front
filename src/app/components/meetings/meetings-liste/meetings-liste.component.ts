import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-meetings-liste',
  templateUrl: './meetings-liste.component.html',
  styleUrls: ['./meetings-liste.component.scss']
})
export class MeetingsListeComponent implements OnInit {

  @Input() meetings!: Meeting[];
  constructor() { }

  ngOnInit(): void {
  }

}
