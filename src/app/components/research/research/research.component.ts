import { Component, HostListener, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
  scrolling: boolean = false;
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
  }

  pageDown() {
    this.prospectsService.updateSearchParameters({
      ...this.prospectsService.researchParamsProspect,
      skip: this.prospectsService.researchParamsProspect.skip - 20
    });
  }


  @HostListener("window:scroll")
  public onScroll(event: Event) {
    this.scrolling = document.documentElement.scrollTop > 10;
  }
}
