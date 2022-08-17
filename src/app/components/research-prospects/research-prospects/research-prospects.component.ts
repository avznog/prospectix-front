import { Component, OnInit } from '@angular/core';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-research-prospects',
  templateUrl: './research-prospects.component.html',
  styleUrls: ['./research-prospects.component.scss']
})
export class ResearchProspectsComponent implements OnInit {
  events!: Event[];
  constructor(
    public readonly prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
  }

  pageUp() {
    this.prospectsService.updateSearchParameters({
      ...this.prospectsService.researchParamsProspect,
      skip: this.prospectsService.researchParamsProspect.skip + 2
    });
    console.log(this.prospectsService.prospects)
  }

  pageDown() {
    this.prospectsService.updateSearchParameters({
      ...this.prospectsService.researchParamsProspect,
      skip: this.prospectsService.researchParamsProspect.skip - 2
    });
  }


  updateEvents(newEvents: Event[]) {
    this.events = newEvents;
  }
}
