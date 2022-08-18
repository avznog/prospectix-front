import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateEventDto } from 'src/app/dto/events/create-event.dto';
import { Event } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: Event[] = [];
  constructor(
    private http: HttpClient
  ) { }

  create(createEventDto: CreateEventDto) : Subscription {
    return this.http.post<Event>(`events/create`, createEventDto).subscribe();
  }

  findAllByProspect(prospectId: number) : Observable<Event[]> {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("prospectId", prospectId);
    return this.http.get<Event[]>(`events/find-all-by-prospect`, { params: queryParameters });
  }

  updateEvents(prospectId: number) {
    this.findAllByProspect(prospectId).subscribe(events => this.events = events);
  }
}
