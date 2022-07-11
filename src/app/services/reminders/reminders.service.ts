import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
    return this.http.delete(`http://localhost:3000/reminders/delete/${idReminder}`).subscribe();
  }
}
