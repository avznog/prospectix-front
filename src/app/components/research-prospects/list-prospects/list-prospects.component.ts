import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-list-prospects',
  templateUrl: './list-prospects.component.html',
  styleUrls: ['./list-prospects.component.scss']
})
export class ListProspectsComponent implements OnInit {
  @Input() events!: Event[];
  @Output() updateEventsEvent = new EventEmitter<Event[]>();
  constructor(
    public prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
  }

  eventsUpdated(newEvents: Event[]) {
    this.updateEvents(newEvents);
  }

  updateEvents(value: Event[]) {
    this.updateEventsEvent.emit(value);
  }

}
