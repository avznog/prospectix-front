import { Component, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';

@Component({
  selector: 'app-liste-bookmarks',
  templateUrl: './liste-bookmarks.component.html',
  styleUrls: ['./liste-bookmarks.component.scss']
})
export class ListeBookmarksComponent implements OnInit {
  constructor(
    public bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
  }
}
