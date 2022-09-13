import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { StageType } from 'src/app/constants/stage.type';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
import { Bookmark } from 'src/app/models/bookmark.model';
import { ResearchParamsBookmarks } from 'src/app/models/research-params-bookmarks.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  researchParamsBookmarks: ResearchParamsBookmarks = {
    keyword: '',
    skip: 0,
    pseudo: this.authService.currentUserSubject.getValue().pseudo ?? ""
  };
  bookmarks = new Map<number, Bookmark>();
  
  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) { 
    this.loadMore();
  }

  resetSearch(researchParamsBookmarks: ResearchParamsBookmarks) {
    this.bookmarks.clear();
    this.updateSearchParameters({
      ...researchParamsBookmarks,
      skip: 0
    });
  }

  updateSearchParameters(researchParamsBookmarks: ResearchParamsBookmarks) {
    if(researchParamsBookmarks != this.researchParamsBookmarks)
      this.researchParamsBookmarks = researchParamsBookmarks;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();
    if(this.researchParamsBookmarks.activity)
      queryParameters = queryParameters.append("activity", this.researchParamsBookmarks.activity)
    
    if(this.researchParamsBookmarks.city)
      queryParameters = queryParameters.append("city", this.researchParamsBookmarks.city)
    
    if(this.researchParamsBookmarks.skip)
      queryParameters = queryParameters.append("skip", this.researchParamsBookmarks.skip)
    
    queryParameters = queryParameters.append("keyword", this.researchParamsBookmarks.keyword)
    queryParameters = queryParameters.append("pseudo", this.researchParamsBookmarks.pseudo)
    queryParameters = queryParameters.append("take", 20);

    this.http.get<Bookmark[]>(`bookmarks/find-all-paginated/`, { params: queryParameters}).subscribe(bookmarks => bookmarks.forEach(bookmark => this.bookmarks.set(bookmark.id, bookmark)));
  }

  create(createBookmarkDto: CreateBookmarkDto) : Subscription {
    return this.http.post<Bookmark>(`bookmarks`, createBookmarkDto).subscribe(bookmark => {
      bookmark.prospect.stage = StageType.BOOKMARK;
      bookmark.prospect.isBookmarked = true;
      this.bookmarks.set(bookmark.id, bookmark)
    });
  }

  deleteByProspect(prospectId: number, bookmarkId: number) {
    this.http.delete<Bookmark>(`bookmarks/by-prospect/${prospectId}`).subscribe(() => {
      this.bookmarks.delete(bookmarkId);
    });
  }

  updateByStage(idProspect: number, stage: StageType) {
    this.bookmarks.forEach(bookmark => {
      if(bookmark.prospect.id == idProspect)
        return bookmark.prospect.stage = stage;
      return bookmark
    })
  }
}
