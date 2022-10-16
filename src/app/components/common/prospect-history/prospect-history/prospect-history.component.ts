import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-prospect-history',
  templateUrl: './prospect-history.component.html',
  styleUrls: ['./prospect-history.component.scss']
})
export class ProspectHistoryComponent implements OnInit {

  @Input() prospect!: Prospect;
  constructor(
    public eventsService: EventsService
  ) { }
  ngOnInit(): void {
  }

}
