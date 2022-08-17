import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CreateProspectDto } from 'src/app/dto/prospects/create-prospect.dto';
import { UpdateProspectDto } from 'src/app/dto/prospects/update-prospects.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParamsBookmarks } from 'src/app/models/research-params-bookmarks.model';
import { ResearchParamsProspect } from 'src/app/models/research-params-prospect.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  prospects = new Map<number, Prospect>();
  researchParamsProspect : ResearchParamsProspect = {
    skip: 0
  };
  constructor(
    private http: HttpClient
  ) { 
    this.loadMore();
  }

  resetSearch(researchParamsProspect: ResearchParamsProspect) {
    this.prospects.clear();
    this.updateSearchParameters({
      ...researchParamsProspect,
      skip: 0
    });
  }

  updateSearchParameters(researchParamsProspect: ResearchParamsProspect) {
    if(researchParamsProspect != this.researchParamsProspect)
      this.researchParamsProspect = researchParamsProspect;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();
      if(this.researchParamsProspect.activity)
      queryParameters = queryParameters.append("activity", this.researchParamsProspect.activity)
      
      if(this.researchParamsProspect.city)
      queryParameters = queryParameters.append("city", this.researchParamsProspect.city)
      
      if(this.researchParamsProspect.skip)
      queryParameters = queryParameters.append("skip", this.researchParamsProspect.skip)
      
      queryParameters = queryParameters.append("keyword", this.researchParamsProspect.keyword ?? "")
      queryParameters = queryParameters.append("take", 2);
      this.http.get<Prospect[]>(`prospects/find-all-paginated/`, { params: queryParameters}).subscribe(prospects => prospects.forEach(prospect => this.prospects.set(prospect.id, prospect)));
  }

  create(createProspectDto: CreateProspectDto) : Subscription {
    return this.http.post<Prospect>(`prospects/create`, createProspectDto).subscribe();
  }

  update(idProspect: number, updateProspectDto: UpdateProspectDto) : Subscription {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, updateProspectDto).subscribe();
  }

  updateComment(idProspect: number, comment: { comment: string }) : Subscription {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, comment).subscribe();
  }

  updateNbNo(idProspect: number, nbNo: { nbNo: number }) : Subscription {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, nbNo).subscribe();
  }

  updateIsBookmarked(idProspect: number, isBookmarked: { isBookmarked: boolean }) : Subscription {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, isBookmarked).subscribe();
  }

  updateByCity(idProspect: number, cityName: string) : Subscription {
    return this.http.get<Prospect>(`prospects/by-city/${idProspect}/${cityName}`).subscribe();
  }

  updateByActivity(idProspect: number, activityName: string) : Subscription {
    return this.http.get<Prospect>(`prospects/by-activity/${idProspect}/${activityName}`).subscribe();
  }

  findAllBookmarksPaginated(researchParams: ResearchParamsBookmarks) : Observable<Prospect[]> {
    let queryParameters = new HttpParams();
    if(researchParams.activity)
      queryParameters = queryParameters.append("activity", researchParams.activity)
      
      if(researchParams.city)
      queryParameters = queryParameters.append("city", researchParams.city)
      
      if(researchParams.skip)
      queryParameters = queryParameters.append("skip", researchParams.skip)
      
      queryParameters = queryParameters.append("keyword", researchParams.keyword)
      queryParameters = queryParameters.append("pseudo", researchParams.pseudo)
      queryParameters = queryParameters.append("take", 2);

      return this.http.get<Prospect[]>(`prospects/find-all-bookmarks-paginated`, { params: queryParameters });
  }

  findAllByKeyword(keyword: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`prospects/by-keywords/${keyword}`);
  }

  findAllByBookmarks(pseudoPm: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`prospects/by-bookmarks/${pseudoPm}`);
  }

  disable(idProspect: number) : Subscription {
    return this.http.get<Prospect[]>(`prospects/disable/${idProspect}`).subscribe();
  }
}
