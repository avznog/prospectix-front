import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GoogleService } from 'src/app/services/google/google.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    public readonly authService: AuthService,
    public readonly googleService: GoogleService
  ) { }

  ngOnInit(): void {
  }

  onClickGoogleLogout() {
    return this.googleService.logout()
  }

  onCheckGoogleLogged() {
    return this.googleService.checkLogged();
  }

  onConnectGoogle() {
    return this.googleService.authenticate()
  }

}
