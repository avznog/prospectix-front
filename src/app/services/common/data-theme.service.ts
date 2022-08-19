import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataThemeService {
  private subject = new Subject<any>();
  darkMode: boolean = false;
  dataTheme : string = "";
  constructor() {
    this.darkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    window.matchMedia("(prefers-color-scheme: dark").addListener(e => {
      const turnOn = e.matches;
      turnOn ? localStorage.setItem("theme", "dark") : localStorage.getItem("theme");
    })

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
