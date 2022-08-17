import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { ResearchParamsProspect } from 'src/app/models/research-params-prospect.model'
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-research-prospects',
  templateUrl: './research-prospects.component.html',
  styleUrls: ['./research-prospects.component.scss']
})
export class ResearchProspectsComponent implements OnInit {
  // researchParamsProspect : ResearchParamsProspect = { skip: 0 };
  events!: Event[];
  constructor(
    public readonly prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
  }

  pageUp() {
    // this.updateResearchParamsProspect({
    //   ...this.researchParamsProspect,
    //   skip: this.researchParamsProspect.skip + 2
    // });
    this.prospectsService.updateSearchParameters({
      ...this.prospectsService.researchParamsProspect,
      skip: this.prospectsService.researchParamsProspect.skip + 2
    });
    console.log(this.prospectsService.prospects)
  }

  pageDown() {
    // this.updateResearchParamsProspect({
    //   ...this.researchParamsProspect,
    //   skip: this.researchParamsProspect.skip - 2
    // });
    this.prospectsService.updateSearchParameters({
      ...this.prospectsService.researchParamsProspect,
      skip: this.prospectsService.researchParamsProspect.skip - 2
    });
  }

  updateProspects(researchParamsProspect: ResearchParamsProspect) {
    // this.prospectsService.findAllPaginated(researchParamsProspect)
    //   .subscribe({
    //     next: (data) => {
    //       this.prospects = data;
    //     },
    //     error: (err) => {
    //       console.log(err)
    //     }
    //   });
  }

  updateResearchParamsProspect(newParams: ResearchParamsProspect) {
    // this.researchParamsProspect = newParams;
    // this.updateProspects(this.researchParamsProspect);
  }

  updateEvents(newEvents: Event[]) {
    this.events = newEvents;
  }
}
