import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateReminderDto } from 'src/app/dto/reminders/create-reminder.dto';
import { Reminder } from 'src/app/models/reminder.model';

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

  findAllByKeyword(keyword: string) : Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`http://localhost:3000/reminders/by-keyword/${keyword}`);
  }

  create(createReminderDto: CreateReminderDto) : Subscription {
    return this.http.post<Reminder>(`http://localhost:3000/reminders`, createReminderDto).subscribe();
  }

  findAllByProspect(idProspect: number) : Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`http://localhost:3000/reminders/by-prospect/${idProspect}`);
  }
}
