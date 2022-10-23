import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';

@Injectable({
  providedIn: 'root'
})
export class SlackService {

  constructor(
    private http: HttpClient
  ) { }

  sendFraud(prospect: Prospect) {
    this.http.post("slack/send-fraud", prospect).subscribe()
  }

  sendChamp() {
    this.http.get("slack/send-champ").subscribe();
  }
}
