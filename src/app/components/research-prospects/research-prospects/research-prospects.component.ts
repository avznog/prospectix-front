import { Component, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-research-prospects',
  templateUrl: './research-prospects.component.html',
  styleUrls: ['./research-prospects.component.scss']
})
export class ResearchProspectsComponent implements OnInit {
  constructor(
    public readonly prospectsService: ProspectsService,
    public bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
  }

  pageUp() {
    this.prospectsService.updateSearchParameters({
      ...this.prospectsService.researchParamsProspect,
      skip: this.prospectsService.researchParamsProspect.skip + 20
    });
    console.log(this.prospectsService.prospects)
  }

  pageDown() {
    this.prospectsService.updateSearchParameters({
      ...this.prospectsService.researchParamsProspect,
      skip: this.prospectsService.researchParamsProspect.skip - 20
    });
  }
}
