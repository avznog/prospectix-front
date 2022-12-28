import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  logged: boolean = false;
  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService
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
    return this.http.get<{url: string}>('google/auth').subscribe(url => {
      window.open(url.url)
      console.log(url)
    })
  }

  oauth2callback(code: string) {
    return this.http.get<boolean>(`google/oauth2callback/${code}`).subscribe(res => {
      if(res) {
        this.logged = true;
        console.log("success")
      } else {
        this.logged = false;
        console.log("failed")
      }
    })
  }

  // // authenticate() {
  //   this.http.get(`google/auth`).subscribe(logged => {
  //     // window.open(logged)
  //     console.log(logged)
  //     // this.logged = logged;
  //     // if(logged) {
  //     //   this.toastsService.addToast({
  //     //     type: "alert-success",
  //     //     message: `Vous êtes connecté à votre compte Google`
  //     //   });
  //     // } else {
  //     //   this.toastsService.addToast({
  //     //     type: "alert-error",
  //     //     message: `La connexion à votre compte Google a échoué`
  //     //   })
  //     // }
  //   })
  // }
}
