import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateReminderDto } from 'src/app/dto/reminders/create-reminder.dto';
import { Reminder } from 'src/app/models/reminder.model';
import { ResearchParamsReminder } from 'src/app/models/research-params-reminder.model';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  constructor(
    private http: HttpClient
  ) { }

  findAll() : Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`http://localhost:3000/reminders`);
  }

  deleteReminder(idReminder: number) : Subscription {
    return this.http.delete<Reminder>(`http://localhost:3000/reminders/delete/${idReminder}`).subscribe();
  }

  markDone(idReminder: number) : Subscription {
    return this.http.get<Reminder>(`http://localhost:3000/reminders/mark-done/${idReminder}`).subscribe();
  }

  markUndone(idReminder: number) : Subscription {
    return this.http.get<Reminder>(`http://localhost:3000/reminders/mark-undone/${idReminder}`).subscribe();
  }

  create(createReminderDto: CreateReminderDto) : Subscription {
    return this.http.post<Reminder>(`http://localhost:3000/reminders`, createReminderDto).subscribe();
  }

  findAllByProspect(idProspect: number) : Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`http://localhost:3000/reminders/by-prospect/${idProspect}`);
  }

  findAllPaginated(researchParamsReminder: ResearchParamsReminder) : Observable<Reminder[]> {
    let queryParameters = new HttpParams();
    if(researchParamsReminder.priority)
      queryParameters = queryParameters.append("priority", researchParamsReminder.priority)
    
    if(researchParamsReminder.orderByPriority)
      queryParameters = queryParameters.append("orderByPriority", researchParamsReminder.orderByPriority)
    
    if(researchParamsReminder.date && researchParamsReminder.date != "")
      queryParameters = queryParameters.append("date",researchParamsReminder.date)

    if(researchParamsReminder.skip)
      queryParameters = queryParameters.append("skip", researchParamsReminder.skip)
      
    queryParameters = queryParameters.append("done", researchParamsReminder.done)
    queryParameters = queryParameters.append("oldOrNew", researchParamsReminder.oldOrNew)
    queryParameters = queryParameters.append("keyword",researchParamsReminder.keyword)
    queryParameters = queryParameters.append("take", 2);
    
    return this.http.get<Reminder[]>(`http://localhost:3000/reminders/find-all-paginated`, { params: queryParameters });
  }

}
