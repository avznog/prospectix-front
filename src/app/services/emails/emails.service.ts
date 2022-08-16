import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Email } from 'src/app/models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(
    private http: HttpClient
  ) { }

  updateEmail(idEmail: number, email: { email: string }) : Subscription {
    return this.http.patch<Email>(`emails/${idEmail}`, email).subscribe();
  }
}
