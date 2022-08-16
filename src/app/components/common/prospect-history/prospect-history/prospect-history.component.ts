import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-prospect-history',
  templateUrl: './prospect-history.component.html',
  styleUrls: ['./prospect-history.component.scss']
})
export class ProspectHistoryComponent implements OnInit {

  constructor() { }
  content!: string;
  @Input() events!: Event[];
  ngOnInit(): void {
  }

}
