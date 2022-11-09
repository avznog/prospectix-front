import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { StageType } from 'src/app/constants/stage.type';
import { CreateReminderDto } from 'src/app/dto/reminders/create-reminder.dto';
import { UpdateReminderDto } from 'src/app/dto/reminders/update-reminder.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { ResearchParamsReminder } from 'src/app/models/research-params-reminder.model';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  nbReminders: number = 0;
  reminders = new Map<number, Reminder>();
  remindersDone = new Map<number, Reminder>();
  researchParamsReminder: ResearchParamsReminder = {
    take: 20,
    skip: 0,
    done: "false",
    priority: 0
  }

  constructor(
    private http: HttpClient
  ) {
    this.loadMore();
    this.loadRemindersDone()
   }


  resetSearch(researchParamsReminder: ResearchParamsReminder) {
    this.researchParamsReminder.done == true || this.researchParamsReminder.done == 'true' ? this.remindersDone.clear() : this.reminders.clear();
    this.updateSearchParameters({
      ...researchParamsReminder,
      skip: 0
    });
  }

  updateSearchParameters(researchParamsReminder: ResearchParamsReminder) {
    if(researchParamsReminder != this.researchParamsReminder)
      this.researchParamsReminder = researchParamsReminder;
      this.researchParamsReminder.done == true || this.researchParamsReminder.done == 'true' ? this.loadRemindersDone() : this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("priority", this.researchParamsReminder.priority)
  
    queryParameters = queryParameters.append("skip", this.researchParamsReminder.skip)      
    queryParameters = queryParameters.append("done", this.researchParamsReminder.done)
    queryParameters = queryParameters.append("take", 20);
    
    return this.http.get<Reminder[]>(`reminders/find-all-paginated`, { params: queryParameters }).subscribe(reminders => {
      reminders.forEach(reminder => this.reminders.set(reminder.id, reminder))
      this.countReminders()
  });
  }

  loadRemindersDone() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("priority",this.researchParamsReminder.priority)
    queryParameters = queryParameters.append("take",20)
    queryParameters = queryParameters.append("skip",0)
    return this.http.get<Reminder[]>(`reminders/find-all-reminders-done`, {params: queryParameters }).subscribe(reminders => reminders.forEach(reminder => this.remindersDone.set(reminder.id, reminder)));
  }

  deleteReminder(idReminder: number) : Subscription {
    return this.http.delete<Reminder>(`reminders/delete/${idReminder}`).subscribe(() => {
      this.reminders.delete(idReminder)
      this.nbReminders -= 1;
    });
  }

  markDone(idReminder: number) : Subscription {
    return this.http.get<Reminder>(`reminders/mark-done/${idReminder}`).subscribe(() => {
      this.reminders.set(idReminder, { ...this.reminders.get(idReminder)!, done: true })
      this.remindersDone.set(idReminder, { ...this.reminders.get(idReminder)!, done: true });
      this.nbReminders -= 1;
    });
  }

  create(createReminderDto: CreateReminderDto) : Subscription {
    return this.http.post<Reminder>(`reminders`, createReminderDto).subscribe(reminder => {
      this.reminders.set(reminder.id, { ...reminder, prospect: { ...reminder.prospect, stage: StageType.REMINDER }})
      this.nbReminders += 1;
    });
  }

  update(idReminder: number, updateReminderDto: UpdateReminderDto) {
    return this.http.patch<Reminder>(`reminders/${idReminder}`, updateReminderDto).subscribe(() => this.reminders.set(idReminder, { ...this.reminders.get(idReminder)!, ...updateReminderDto}))
  }

  findAllByProspect(idProspect: number) {
    return this.http.get<Reminder[]>(`reminders/by-prospect/${idProspect}`);
  }

  updateLiveProspect(prospect: Prospect) {
    this.reminders.forEach(reminder => {
      if(reminder.prospect.id == prospect.id)
        return reminder.prospect = prospect
      return
    })
  }

  updateByStage(idProspect: number, stage: { stage: StageType }) {
    this.reminders.forEach(reminder => {
      if(reminder.prospect.id == idProspect)
        return reminder.prospect.stage = stage.stage
      return reminder
    });
  }

  countReminders() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("priority", this.researchParamsReminder.priority)
    queryParameters = queryParameters.append("skip", this.researchParamsReminder.skip)      
    queryParameters = queryParameters.append("done", this.researchParamsReminder.done)
    queryParameters = queryParameters.append("take", 20);
    return this.http.get<number>(`reminders/count-reminders`, { params: queryParameters }).subscribe(nbReminders => this.nbReminders = nbReminders);
  }
}
