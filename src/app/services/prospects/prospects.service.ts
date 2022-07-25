import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Prospect } from 'src/app/models/prospect.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  constructor(
    private http: HttpClient
  ) { }

  updateComment(idProspect: number, comment: { comment: string }) : Subscription {
    return this.http.patch<Prospect>(`http://localhost:3000/prospects/${idProspect}`, comment).subscribe();
  }

  updateNbNo(idProspect: number, nbNo: { nbNo: number }) : Subscription {
    return this.http.patch<Prospect>(`http://localhost:3000/prospects/${idProspect}`, nbNo).subscribe();
  }

  findAll() : Observable<Prospect[]> {
    return this.http.get<Prospect[]>("http://localhost:3000/prospects");
  }

  findAllByActivity(activityName: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`http://localhost:3000/prospects/by-activity/${activityName}`);
  }

  findAllByCity(cityName: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`http://localhost:3000/prospects/by-city/${cityName}`);
  }

  findAllByKeyword(keyword: string) : Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`http://localhost:3000/prospects/by-keywords/${keyword}`);
  }
}
