import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParamsBookmarks } from 'src/app/models/research-params-bookmarks.model';
import { EventsService } from '../events/events.service';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  maxNbBookmarks: number = 50;
  nbBookmarks: number = 0;
  researchParamsBookmarks: ResearchParamsBookmarks = {
    keyword: null,
    skip: 0,
    zipcode: null,
    secondaryActivity: null,
    primaryActivity: null
  };
  bookmarks = new Map<number, Bookmark>();
  
  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService,
    private readonly eventsService: EventsService,
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
    queryParameters = queryParameters.append("take", 20);
    this.researchParamsBookmarks.skip && (queryParameters = queryParameters.append("skip", this.researchParamsBookmarks.skip));
    this.researchParamsBookmarks.keyword && (queryParameters = queryParameters.append("keyword", this.researchParamsBookmarks.keyword));
    this.researchParamsBookmarks.zipcode && (queryParameters = queryParameters.append("zipcode", this.researchParamsBookmarks.zipcode));
    this.researchParamsBookmarks.primaryActivity && (queryParameters = queryParameters.append("primaryActivity", this.researchParamsBookmarks.primaryActivity));
    this.researchParamsBookmarks.secondaryActivity && (queryParameters = queryParameters.append("secondaryActivity", this.researchParamsBookmarks.secondaryActivity));

    this.http.get<{bookmarks: Bookmark[], count: number}>(`bookmarks/find-all-paginated/`, { params: queryParameters}).subscribe(data => {
      data.bookmarks.forEach(bookmark => this.bookmarks.set(bookmark.id, bookmark));
      this.nbBookmarks = data.count;
    });
  }

  create(createBookmarkDto: CreateBookmarkDto) : Subscription {
    return this.http.post<Bookmark>(`bookmarks`, createBookmarkDto).subscribe(bookmark => {
      this.bookmarks.set(bookmark.id, { ...bookmark, prospect: { ...bookmark.prospect, stage: StageType.BOOKMARK, isBookmarked: true }})
      this.nbBookmarks += 1;

      this.toastsService.addToast({
        type: "alert-warning",
        message: `${createBookmarkDto.prospect.companyName} ajouté aux favoris`
      });

      // creating the bookmark
      this.eventsService.create({
        type: EventType.ADD_BOOKMARKS,
        prospect: bookmark.prospect,
        date: new Date,
        description: `${EventDescriptionType.ADD_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
      });
    });
  }

  delete(bookmarkId: number) {
    this.http.delete<Bookmark>(`bookmarks/${bookmarkId}`).subscribe(() => {
      const name = this.bookmarks.get(bookmarkId)!.prospect.companyName;
      this.bookmarks.delete(bookmarkId)
      this.nbBookmarks -= 1;
      this.toastsService.addToast({
        type: "alert-error",
        message: `${name} supprimé des favoris`
      })
    });
  }

  updateNbNo(idProspect: number) {
    this.bookmarks.forEach(bookmark => {
      if(bookmark.prospect.id == idProspect){
        return bookmark.prospect.nbNo = bookmark.prospect.nbNo + 1
      }
      return bookmark
    })
  }

  updateByStage(idProspect: number, stage: { stage: StageType }) {
    this.bookmarks.forEach(bookmark => {
      if(bookmark.prospect.id == idProspect)
        return bookmark.prospect.stage = stage.stage
      return bookmark
    });
  }

  updateLiveProspect(prospect: Prospect) {
    this.bookmarks.forEach(bookmark => {
      if(bookmark.prospect.id == prospect.id)
        return bookmark.prospect = prospect
      return
    })
  }

  updateCommentProspect(idProspect: number, newComment: string) {
    this.bookmarks.forEach(bookmark => {
      if(bookmark.prospect.id == idProspect) {
        return bookmark.prospect.comment = newComment
      }
      return
    })
  }
}
