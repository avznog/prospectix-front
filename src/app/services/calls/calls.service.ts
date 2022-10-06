import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCallDto } from 'src/app/dto/calls/create-call.dto';
import { Call } from 'src/app/models/call.model';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  allMyCalls: number = 0;
  constructor(
    private http: HttpClient
  ) {
    this.countAllForMe();
   }

  createForMe(createCallDto: CreateCallDto) {
    this.http.post<Call>(`calls/create-for-me`, createCallDto).subscribe(() => this.allMyCalls += 1);
  }

  countAllForMe() {
    this.http.get<number>(`calls/count-all-for-me`).subscribe((allMyCalls) => this.allMyCalls = allMyCalls)
  }

}
