import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UpdateProspectDto } from 'src/app/dto/prospects/update-prospects.dto';
import { City } from 'src/app/models/city.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParams } from 'src/app/models/research-params.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  constructor(
    private http: HttpClient
  ) { }

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

  findAllPaginated(researchParams: ResearchParams) {
      let queryParams = new HttpParams();
      if(researchParams.activity)
        queryParams = queryParams.append("activity", researchParams.activity)
      
      if(researchParams.city)
        queryParams = queryParams.append("city", researchParams.city)
      
      if(researchParams.skip)
        queryParams = queryParams.append("skip", researchParams.skip)
      
      if(researchParams.keyword)
        queryParams = queryParams.append("keyword", researchParams.keyword)
      else
        queryParams = queryParams.append("keyword","")
      
        queryParams = queryParams.append("take", 2);


      return this.http.get<Prospect[]>(`http://localhost:3000/prospects/find-all-paginated/`, { params: queryParams});
  }

  findAllByKeyword(keyword: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`http://localhost:3000/prospects/by-keywords/${keyword}`);
  }

  findAllByBookmarks(pseudoPm: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`http://localhost:3000/prospects/by-bookmarks/${pseudoPm}`);
  }

}
