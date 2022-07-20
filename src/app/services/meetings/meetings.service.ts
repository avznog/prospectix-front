import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meeting } from 'src/app/models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(
    private http: HttpClient
  ) { }

  findAll() : Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`http://localhost:3000/meetings`);
  }

  deleteMeeting(idMeeting: number) : Subscription {
    return this.http.delete<Meeting>(`http://localhost:3000/meetings/delete/${idMeeting}`).subscribe();
  }

  markDone(idMeeting : number) : Subscription {
    return this.http.get<Meeting>(`http://localhost:3000/meetings/mark-done/${idMeeting}`).subscribe();
  }

  markUndone(idMeeting: number) : Subscription {
    return this.http.get<Meeting>(`http://localhost:3000/meetings/mark-undone/${idMeeting}`).subscribe();
  }

  findAllByKeyword(keyword: string) : Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`http://localhost:3000/meetings/by-keyword/${keyword}`);
  }
}
