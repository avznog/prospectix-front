import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataThemeService {
  private subject = new Subject<any>();
 
  sendData(message: string) {
      this.subject.next(message);
  }

  getData(): Observable<any> {
      return this.subject.asObservable();
  }
}
