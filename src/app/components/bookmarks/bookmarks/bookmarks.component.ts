import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParamsBookmarks } from 'src/app/models/research-params-bookmarks.model';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  prospects!: Prospect[];
  researchParamsBookmark: ResearchParamsBookmarks = {
    take: 2,
    skip: 0,
    keyword: "",
    pseudo: ""
  };

  constructor(
    private readonly prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
    this.prospectsService.findAllBookmarksPaginated(this.researchParamsBookmark)
      .subscribe({
        next: (data) => {
          this.prospects = data;
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  pageDown() {
    this.updateResearchParamsBookmark({
      ...this.researchParamsBookmark,
      skip: this.researchParamsBookmark.skip - 2
    });
  }

  pageUp() {
    this.updateResearchParamsBookmark({
      ...this.researchParamsBookmark,
      skip: this.researchParamsBookmark.skip + 2
    });
  }

  updateProspects(researchParamsBookmark: ResearchParamsBookmarks) {
    this.prospectsService.findAllBookmarksPaginated(researchParamsBookmark)
      .subscribe({
        next: (data) => {
          this.prospects = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  updateResearchParamsBookmark(newResearchParamsBookmark: ResearchParamsBookmarks) {
    this.researchParamsBookmark = newResearchParamsBookmark;
    this.updateProspects(this.researchParamsBookmark);
  }

}
