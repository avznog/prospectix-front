import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Prospect } from 'src/app/models/prospect.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  constructor(
    private http: HttpClient
  ) { }

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
