import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ProjectManager } from '../models/project-manager.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<ProjectManager>;
  public currentUser: Observable<ProjectManager>;
  constructor(
    private http: HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<ProjectManager>(JSON.parse(localStorage.getItem("currentUser")!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getcurrentUserValue(): ProjectManager {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<ProjectManager>(`http://localhost:3000/auth/login`, {username, password})
      .pipe(map(user => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }))
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next({} as ProjectManager);
  }
}
