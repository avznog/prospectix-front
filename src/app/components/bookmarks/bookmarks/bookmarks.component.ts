import { Component, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  constructor(
    public readonly bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
  }

  pageDown() {
    this.bookmarksService.updateSearchParameters({
      ...this.bookmarksService.researchParamsBookmarks,
      skip: this.bookmarksService.researchParamsBookmarks.skip - 20
    })
  }

  pageUp() {
    this.bookmarksService.updateSearchParameters({
      ...this.bookmarksService.researchParamsBookmarks,
      skip: this.bookmarksService.researchParamsBookmarks.skip + 20
    })
  }

}
