import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataThemeService {
  private subject = new Subject<any>();
  dataTheme : string = "";
  constructor() {
    this.getData().subscribe(data => {
      localStorage.setItem("theme",data)
      this.dataTheme = data
    })
  }
 
  sendData(message: string) {
      this.subject.next(message); 
  }

  getData(): Observable<any> {
      return this.subject.asObservable();
  }

}
