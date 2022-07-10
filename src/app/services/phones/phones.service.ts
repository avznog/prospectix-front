import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Phone } from 'src/app/models/phone.model';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  constructor(
    private http: HttpClient
  ) { }

  updatePhoneNumber(idPhone: number, updatePhoneDto: {number: string}) : Subscription {
    return this.http.patch<Phone>(`http://localhost:3000/phones/${idPhone}`, updatePhoneDto).subscribe();
  }
}
