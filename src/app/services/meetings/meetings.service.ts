import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { StageType } from 'src/app/constants/stage.type';
import { CreateMeetingDto } from 'src/app/dto/meetings/create-meeting.dto';
import { Meeting } from 'src/app/models/meeting.model';
import { ResearchParamsMeeting } from 'src/app/models/research-params-meeting.model';
import { ProspectsService } from '../prospects/prospects.service';
import { RemindersService } from '../reminders/reminders.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  meetings = new Map<number, Meeting>();
  researchParamsMeeting: ResearchParamsMeeting = {
    take: 20,
    skip: 0,
    done: "false",
    oldOrNew: "new",
    keyword: ""
  }
  constructor(
    private http: HttpClient,
    private prospectsService: ProspectsService,
    private remindersService: RemindersService
  ) { 
    this.loadMore();
  }


  resetSearch(researchParamsMeeting: ResearchParamsMeeting) {
    this.meetings.clear();
    this.updateSearchParameters({
      ...researchParamsMeeting,
      take: 20,
      skip: 0
    }); 
  }

  updateSearchParameters(researchParamsMeeting: ResearchParamsMeeting) {
    if(researchParamsMeeting != this.researchParamsMeeting)
      console.log("not same search")
      this.researchParamsMeeting = researchParamsMeeting;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();

    if(this.researchParamsMeeting.type)
      queryParameters = queryParameters.append("type", this.researchParamsMeeting.type)

    if(this.researchParamsMeeting.date)
      queryParameters = queryParameters.append("date",this.researchParamsMeeting.date)

    queryParameters = queryParameters.append("skip", this.researchParamsMeeting.skip)
    queryParameters = queryParameters.append("done", this.researchParamsMeeting.done)
    queryParameters = queryParameters.append("oldOrNew", this.researchParamsMeeting.oldOrNew)
    queryParameters = queryParameters.append("keyword", this.researchParamsMeeting.keyword)
    queryParameters = queryParameters.append("take",20)
    
    return this.http.get<Meeting[]>(`meetings/find-all-paginated`, { params: queryParameters }).subscribe(meetings => meetings.forEach(meeting => this.meetings.set(meeting.id, meeting)));
  
  }

  deleteMeeting(idMeeting: number) : Subscription {
    return this.http.delete<Meeting>(`meetings/delete/${idMeeting}`).subscribe(() => this.meetings.delete(idMeeting));
  }

  markDone(idMeeting : number) : Subscription {
    return this.http.get<Meeting>(`meetings/mark-done/${idMeeting}`).subscribe(() => this.meetings.set(idMeeting, { ...this.meetings.get(idMeeting)!, done: true }));
  }

  markUndone(idMeeting: number) : Subscription {
    return this.http.get<Meeting>(`meetings/mark-undone/${idMeeting}`).subscribe(() => this.meetings.set(idMeeting, { ...this.meetings.get(idMeeting)!, done: false }));
  }

  create(createMeetingDto: CreateMeetingDto) : Subscription {
    return this.http.post<Meeting>(`meetings`, createMeetingDto).subscribe(meeting => {
      meeting.prospect.stage = StageType.MEETING;
      this.meetings.set(meeting.prospect.id, meeting);
    });
  }

  findAllByProspect(idProspect: number) {
    return this.http.get<Meeting[]>(`meetings/by-prospect/${idProspect}`);
  }
}
