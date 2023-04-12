import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateReminderDto } from 'src/app/dto/reminders/create-reminder.dto';
import { UpdateReminderDto } from 'src/app/dto/reminders/update-reminder.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { ResearchParamsReminder } from 'src/app/models/research-params-reminder.model';
import { EventsService } from '../events/events.service';
import { ToastsService } from '../toasts/toasts.service';

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
    private http: HttpClient,
    private readonly toastsService: ToastsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService
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
    
    return this.http.get<{reminders: Reminder[], count: number}>(`reminders/find-all-paginated`, { params: queryParameters }).subscribe(data => {
      data.reminders.forEach(reminder => this.reminders.set(reminder.id, reminder))
      this.nbReminders = data.count;
  });
  }

  loadRemindersDone() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("priority",this.researchParamsReminder.priority)
    queryParameters = queryParameters.append("take",20)
    queryParameters = queryParameters.append("skip",0)
    return this.http.get<{remindersDone: Reminder[], count: number}>(`reminders/find-all-reminders-done`, {params: queryParameters }).subscribe(data => data.remindersDone.forEach(reminder => this.remindersDone.set(reminder.id, reminder)));
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
      this.toastsService.addToast({
        type: "alert-success",
        message: `Rappel avec ${createReminderDto.prospect.companyName} ajouté`
      });

      this.eventsService.create({
        type: EventType.ADD_REMINDER,
        prospect: reminder.prospect,
        date: new Date,
        description: `${EventDescriptionType.ADD_REMINDER} ${this.authService.currentUserSubject.getValue().pseudo}`
      })
    });
  }

  update(idReminder: number, updateReminderDto: UpdateReminderDto) {
    return this.http.patch<Reminder>(`reminders/${idReminder}`, updateReminderDto).subscribe(() => {
      this.reminders.set(idReminder, { ...this.reminders.get(idReminder)!, ...updateReminderDto})
      this.toastsService.addToast({
        type: "alert-success",
        message: `Rappel avec ${this.reminders.get(idReminder)!.prospect.companyName} mis à jour`
      })
    })
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

    this.remindersDone.forEach(reminder => {
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

    this.remindersDone.forEach(reminder => {
      if(reminder.prospect.id == idProspect)
        return reminder.prospect.stage = stage.stage
      return reminder
    });
  }

  updateCommentProspect(id: number, newComment: string) {
    this.reminders.forEach(reminder => {
      if(reminder.prospect.id == id) {
        return reminder.prospect.comment = newComment
      }
      return
    })

    this.remindersDone.forEach(reminder => {
      if(reminder.prospect.id == id) {
        return reminder.prospect.comment = newComment
      }
      return
    })
  }
}
