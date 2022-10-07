import { Component, OnInit } from '@angular/core';
import { lastDayOfWeek } from 'date-fns';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
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
