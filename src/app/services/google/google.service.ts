import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(
    private http: HttpClient
  ) { }

  test() {
    try {
      this.http.get("google").subscribe(result => console.log(result))
    } catch (error) {
      console.error(error)
    }
  }
  addEvent() {
    try {
      this.http.get("google/add-event").subscribe(result => console.log(result))
    } catch (error) {
      console.error(error)
    }
  }
}
