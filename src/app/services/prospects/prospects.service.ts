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

  constructor(
    private http: HttpClient
  ) { }

  create(createProspectDto: CreateProspectDto) : Subscription {
    return this.http.post<Prospect>(`http://localhost:3000/prospects/create`, createProspectDto).subscribe();
  }

  update(idProspect: number, updateProspectDto: UpdateProspectDto) : Subscription {
    return this.http.patch<Prospect>(`http://localhost:3000/prospects/${idProspect}`, updateProspectDto).subscribe();
  }

  updateComment(idProspect: number, comment: { comment: string }) : Subscription {
    return this.http.patch<Prospect>(`http://localhost:3000/prospects/${idProspect}`, comment).subscribe();
  }

  updateNbNo(idProspect: number, nbNo: { nbNo: number }) : Subscription {
    return this.http.patch<Prospect>(`http://localhost:3000/prospects/${idProspect}`, nbNo).subscribe();
  }

  updateIsBookmarked(idProspect: number, isBookmarked: { isBookmarked: boolean }) : Subscription {
    return this.http.patch<Prospect>(`http://localhost:3000/prospects/${idProspect}`, isBookmarked).subscribe();
  }

  updateByCity(idProspect: number, cityName: string) : Subscription {
    return this.http.get<Prospect>(`http://localhost:3000/prospects/by-city/${idProspect}/${cityName}`).subscribe();
  }

  updateByActivity(idProspect: number, activityName: string) : Subscription {
    return this.http.get<Prospect>(`http://localhost:3000/prospects/by-activity/${idProspect}/${activityName}`).subscribe();
  }

  findAllPaginated(researchParams: ResearchParamsProspect) : Observable<Prospect[]> {
      let queryParameters = new HttpParams();
      if(researchParams.activity)
      queryParameters = queryParameters.append("activity", researchParams.activity)
      
      if(researchParams.city)
      queryParameters = queryParameters.append("city", researchParams.city)
      
      if(researchParams.skip)
      queryParameters = queryParameters.append("skip", researchParams.skip)
      
      if(researchParams.keyword)
      queryParameters = queryParameters.append("keyword", researchParams.keyword)
      else
      queryParameters = queryParameters.append("keyword","")
      
      queryParameters = queryParameters.append("take", 2);

      return this.http.get<Prospect[]>(`http://localhost:3000/prospects/find-all-paginated/`, { params: queryParameters});
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

      return this.http.get<Prospect[]>(`http://localhost:3000/prospects/find-all-bookmarks-paginated`, { params: queryParameters });
  }

  findAllByKeyword(keyword: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`http://localhost:3000/prospects/by-keywords/${keyword}`);
  }

  findAllByBookmarks(pseudoPm: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`http://localhost:3000/prospects/by-bookmarks/${pseudoPm}`);
  }

  disable(idProspect: number) : Subscription {
    return this.http.get<Prospect[]>(`http://localhost:3000/prospects/disable/${idProspect}`).subscribe();
  }

}
