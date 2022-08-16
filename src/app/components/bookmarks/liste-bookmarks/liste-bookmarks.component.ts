import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Event } from 'src/app/models/event.model';
import { Prospect } from 'src/app/models/prospect.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';

@Component({
  selector: 'app-liste-bookmarks',
  templateUrl: './liste-bookmarks.component.html',
  styleUrls: ['./liste-bookmarks.component.scss']
})
export class ListeBookmarksComponent implements OnInit {
  @Input() events!: Event[];
  @Output() updateEventsEvent = new EventEmitter<Event[]>();
  @Input() prospects!: Prospect[];
  bookmarks!: Bookmark[];
  constructor(
    private readonly bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
    this.bookmarksService.findAll()
    .subscribe({
      next: (data) => {
        this.bookmarks = data;       
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  eventsUpdated(value: Event[]) {
    this.updateEventsEvent.emit(value);
  }
}
