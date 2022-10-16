import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from 'src/app/models/email.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from '../prospects/prospects.service';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(
    private http: HttpClient,
    private prospectsService: ProspectsService
  ) { }

  update(prospect: Prospect, email: Email) {
    return this.http.patch<Email>(`emails/${email.id}`, email).subscribe(() => this.prospectsService.prospects.set(prospect.id, { ...this.prospectsService.prospects.get(prospect.id)!, email: email }));
  }
}
