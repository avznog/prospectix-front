import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-prospect-history',
  templateUrl: './prospect-history.component.html',
  styleUrls: ['./prospect-history.component.scss']
})
export class ProspectHistoryComponent implements OnInit {

  constructor(
    public eventsService: EventsService
  ) { }
  ngOnInit(): void {
  }

}
