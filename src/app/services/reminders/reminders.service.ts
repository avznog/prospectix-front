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

  reminders = new Map<number, Reminder>();
  researchParamsReminder: ResearchParamsReminder = {
    take: 2,
    skip: 0,
    done: "false",
    oldOrNew: "new",
    keyword: "",
  }
  constructor(
    private http: HttpClient
  ) {
    this.loadMore();
   }


  resetSearch(researchParamsReminder: ResearchParamsReminder) {
    this.reminders.clear();
    this.updateSearchParameters({
      ...researchParamsReminder,
      skip: 0
    });
  }

  updateSearchParameters(researchParamsReminder: ResearchParamsReminder) {
    if(researchParamsReminder != this.researchParamsReminder)
      this.researchParamsReminder = researchParamsReminder;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();
    if(this.researchParamsReminder.priority)
      queryParameters = queryParameters.append("priority", this.researchParamsReminder.priority)
    
    if(this.researchParamsReminder.orderByPriority)
      queryParameters = queryParameters.append("orderByPriority", this.researchParamsReminder.orderByPriority)
    
    if(this.researchParamsReminder.date && this.researchParamsReminder.date != "")
      queryParameters = queryParameters.append("date",this.researchParamsReminder.date)

    queryParameters = queryParameters.append("skip", this.researchParamsReminder.skip)      
    queryParameters = queryParameters.append("done", this.researchParamsReminder.done)
    queryParameters = queryParameters.append("oldOrNew", this.researchParamsReminder.oldOrNew)
    queryParameters = queryParameters.append("keyword",this.researchParamsReminder.keyword)
    queryParameters = queryParameters.append("take", 2);
    
    return this.http.get<Reminder[]>(`reminders/find-all-paginated`, { params: queryParameters }).subscribe(reminders => reminders.forEach(reminder => this.reminders.set(reminder.id, reminder)));
  }


  findAll() : Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`reminders`);
  }

  deleteReminder(idReminder: number) : Subscription {
    return this.http.delete<Reminder>(`reminders/delete/${idReminder}`).subscribe();
  }

  markDone(idReminder: number) : Subscription {
    return this.http.get<Reminder>(`reminders/mark-done/${idReminder}`).subscribe();
  }

  markUndone(idReminder: number) : Subscription {
    return this.http.get<Reminder>(`reminders/mark-undone/${idReminder}`).subscribe();
  }

  create(createReminderDto: CreateReminderDto) : Subscription {
    return this.http.post<Reminder>(`reminders`, createReminderDto).subscribe();
  }

  findAllByProspect(idProspect: number) : Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`reminders/by-prospect/${idProspect}`);
  }
}
