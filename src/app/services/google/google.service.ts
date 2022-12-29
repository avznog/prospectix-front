import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  logged: boolean = false;
  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService,
    private readonly authService: AuthService
  ) { 
    this.checkLogged();
  }

  checkLogged() {
    return this.http.get<boolean>(`google/check-logged`).subscribe(logged => {
      this.logged = logged;

      logged && this.toastsService.addToast({
        type: "alert-success",
        message: `Vous vous êtes connecté à votre compte Google`
      })

      !logged && this.toastsService.addToast({
        type: "alert-error",
        message: `Vous n'êtes pas connecté à votre compte Google`
      })
    })
  }

  logout() {
    this.http.get<number>(`google/logout`).subscribe(logged => {
      this.logged = (logged == 0 || logged == 1 ) && false;

      (logged == 0 || logged == 1 ) && this.toastsService.addToast({
        type: "alert-error",
        message: `Vous vous êtes déconnecté de votre compte Google`
      })
    })
  }

   authenticate() {
    localStorage.setItem("locationBeforeGoogleAuth", document.location.href)
    return this.http.get<{url: string}>('google/auth').subscribe(url => {
      window.open(url.url, "_self")
    })
  }

  oauth2callback(code: string) {
    return this.http.get<boolean>(`google/oauth2callback/${code}`).subscribe(res => {
      document.location.href = localStorage.getItem("locationBeforeGoogleAuth") ?? ""
      if(res) {
        this.logged = true;
        this.toastsService.addToast({
          type: 'alert-success',
          message: 'Authentification Google Réussie'
        })
        
      } else {
        this.logged = false;
        this.toastsService.addToast({
          type: 'alert-error',
          message: 'Authentification Google échouée'
        })
      }
      this.authService.refreshUser()
    });
  }
}
