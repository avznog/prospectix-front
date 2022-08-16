import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateMeetingDto } from 'src/app/dto/meetings/create-meeting.dto';
import { Meeting } from 'src/app/models/meeting.model';
import { ResearchParamsMeeting } from 'src/app/models/research-params-meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(
    private http: HttpClient
  ) { }

  findAll() : Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`meetings`);
  }

  deleteMeeting(idMeeting: number) : Subscription {
    return this.http.delete<Meeting>(`meetings/delete/${idMeeting}`).subscribe();
  }

  markDone(idMeeting : number) : Subscription {
    return this.http.get<Meeting>(`meetings/mark-done/${idMeeting}`).subscribe();
  }

  markUndone(idMeeting: number) : Subscription {
    return this.http.get<Meeting>(`meetings/mark-undone/${idMeeting}`).subscribe();
  }

  create(createMeetingDto: CreateMeetingDto) : Subscription {
    return this.http.post<Meeting>(`meetings`, createMeetingDto).subscribe();
  }

  findAllByProspect(idProspect: number) : Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`meetings/by-prospect/${idProspect}`);
  }

  findAllPaginated(researchParamsMeeting: ResearchParamsMeeting) : Observable<Meeting[]> {
    let queryParameters = new HttpParams();

    if(researchParamsMeeting.skip)
      queryParameters = queryParameters.append("skip", researchParamsMeeting.skip)

    if(researchParamsMeeting.type)
      queryParameters = queryParameters.append("type", researchParamsMeeting.type)

    if(researchParamsMeeting.date)
      queryParameters = queryParameters.append("date",researchParamsMeeting.date)

    queryParameters = queryParameters.append("done", researchParamsMeeting.done)
    queryParameters = queryParameters.append("oldOrNew", researchParamsMeeting.oldOrNew)
    queryParameters = queryParameters.append("keyword", researchParamsMeeting.keyword)
    queryParameters = queryParameters.append("take",2)

    return this.http.get<Meeting[]>(`meetings/find-all-paginated`, { params: queryParameters });
  }
}
