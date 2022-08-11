import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { ResearchParamsProspect } from 'src/app/models/research-params-prospect.model'

@Component({
  selector: 'app-research-prospects',
  templateUrl: './research-prospects.component.html',
  styleUrls: ['./research-prospects.component.scss']
})
export class ResearchProspectsComponent implements OnInit {
  prospects!: Prospect[];
  researchParamsProspect : ResearchParamsProspect = { skip: 0 };
  constructor(
    private readonly prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
    this.prospectsService.findAllPaginated(this.researchParamsProspect)
      .subscribe({
        next: (data) => {
          this.prospects = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  pageUp() {
    this.updateResearchParamsProspect({
      ...this.researchParamsProspect,
      skip: this.researchParamsProspect.skip + 2
    });
  }

  pageDown() {
    this.updateResearchParamsProspect({
      ...this.researchParamsProspect,
      skip: this.researchParamsProspect.skip - 2
    });
  }

  updateProspects(researchParamsProspect: ResearchParamsProspect) {
    this.prospectsService.findAllPaginated(researchParamsProspect)
      .subscribe({
        next: (data) => {
          this.prospects = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  updateResearchParamsProspect(newParams: ResearchParamsProspect) {
    this.researchParamsProspect = newParams;
    this.updateProspects(this.researchParamsProspect);
  }
  
}
