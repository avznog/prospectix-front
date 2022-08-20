import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Phone } from 'src/app/models/phone.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from '../prospects/prospects.service';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  constructor(
    private http: HttpClient,
    private prospectsService: ProspectsService
  ) { }
  
  update(prospect: Prospect, phone: Phone) {
    return this.http.patch<Phone>(`phones/${phone.id}`, phone).subscribe(() => this.prospectsService.prospects.set(prospect.id, { ...this.prospectsService.prospects.get(prospect.id)!, phone: phone }));
  }
}
