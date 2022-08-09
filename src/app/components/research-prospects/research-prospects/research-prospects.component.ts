import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { ResearchParams } from 'src/app/models/research-params.model'

@Component({
  selector: 'app-research-prospects',
  templateUrl: './research-prospects.component.html',
  styleUrls: ['./research-prospects.component.scss']
})
export class ResearchProspectsComponent implements OnInit {
  prospects!: Prospect[];
  researchParams : ResearchParams = { skip: 0 };
  constructor(
    private readonly prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
    this.prospectsService.findAllAndCount(this.researchParams)
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
    this.researchParams.skip = this.researchParams.skip+2 
    this.updateProspects(this.researchParams)
  }

  pageDown() {
    this.researchParams.skip = this.researchParams.skip-2 
    this.updateProspects(this.researchParams)
  }

  updateProspects(researchParams: ResearchParams) {
    this.researchParams = researchParams;
    this.prospectsService.findAllAndCount(researchParams)
      .subscribe({
        next: (data) => {
          this.prospects = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  updateResearchParams(newParams: ResearchParams) {
    this.researchParams = newParams;
    this.updateProspects(this.researchParams);
  }
  
}
