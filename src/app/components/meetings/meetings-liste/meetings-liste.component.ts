import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';

@Component({
  selector: 'app-meetings-liste',
  templateUrl: './meetings-liste.component.html',
  styleUrls: ['./meetings-liste.component.scss']
})
export class MeetingsListeComponent implements OnInit {
  constructor(
    public meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
  }

}
