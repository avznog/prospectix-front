import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Prospect } from 'src/app/models/prospect.model';

@Component({
  selector: 'app-list-prospects',
  templateUrl: './list-prospects.component.html',
  styleUrls: ['./list-prospects.component.scss']
})
export class ListProspectsComponent implements OnInit {
  @Input() prospects!: Prospect[];
  @Input() events!: Event[];
  @Output() updateEventsEvent = new EventEmitter<Event[]>();
  constructor(
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
