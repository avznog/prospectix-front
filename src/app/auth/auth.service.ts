import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';
import { ProjectManager } from '../models/project-manager.model';
import jwtDecode from 'jwt-decode';
import AccessToken from './models/access-token.model';
import LoginResponseDTO from './dto/login-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUserSubject: BehaviorSubject<ProjectManager>;
  public readonly loggedInSubject: BehaviorSubject<boolean>;
  public readonly currentUser: Observable<ProjectManager>;
  private accessToken?: string;

  constructor(
    private http: HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<ProjectManager>(JSON.parse(localStorage.getItem("currentUser")!));
    this.loggedInSubject = new BehaviorSubject(localStorage.getItem("loggedIn") == "true");
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private tokenWaiter?: Promise<string>

  public async getAccessToken(): Promise<string | undefined> {
    if(!this.loggedInSubject.value)
      return undefined
    
    let previousWaiter = this.tokenWaiter
    return this.tokenWaiter = (async () => {
      await previousWaiter
      try{
        if(
          !this.accessToken?.length
          || jwtDecode<AccessToken>(this.accessToken).exp - Date.now()/1000 < 35
        )
          await this.refresh()
        
        return this.accessToken!
      }catch(e){
        delete this.tokenWaiter
        throw e
      }
    })()
  }

  public async isLoggedIn(){
    try{
      return !!(await this.getAccessToken())?.length
    }catch(e){
      return false
    }
  }

  async login(username: string, password: string) {
    const response = await lastValueFrom(this.http.post<LoginResponseDTO>("auth/login", {username, password}))
    this.accessToken = response.accessToken
    await this.setLoggedIn()
    return this.accessToken
  }

  async setLoggedIn(){
    this.loggedInSubject.next(true)
    localStorage.setItem("loggedIn", "true")

    if(!this.currentUserSubject.value)
      await this.refreshUser()
  }
  async refreshUser() {
    this.currentUserSubject.next(await lastValueFrom(this.http.get<ProjectManager>("project-managers/me")))
    localStorage.setItem("currentUser", JSON.stringify(this.currentUserSubject.value))
  }

  logout() {
    delete this.accessToken;
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedIn");
    this.loggedInSubject.next(false);
    this.currentUserSubject.next({} as ProjectManager);
    this.http.get("auth/logout").subscribe();
  }

  async refresh() {
    this.accessToken = (await lastValueFrom(this.http.get<{ accessToken: string }>("auth/refresh")))?.accessToken
    await this.setLoggedIn()
  }
}
