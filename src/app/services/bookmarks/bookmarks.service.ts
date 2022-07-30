import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
import { Bookmark } from 'src/app/models/bookmark.model';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { Prospect } from 'src/app/models/prospect.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  constructor(
    private http: HttpClient
  ) { }

  create(createBookmarkDto: CreateBookmarkDto) : Subscription {
    return this.http.post<Bookmark>(`http://localhost:3000/bookmarks`, createBookmarkDto).subscribe();
  }

  deleteByProspect(prospectId: number) : Subscription {
    return this.http.delete<Bookmark>(`http://localhost:3000/bookmarks/by-prospect/${prospectId}`).subscribe();
  }
}
