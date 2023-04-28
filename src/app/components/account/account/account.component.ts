import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/auth.service';
import { GoogleService } from 'src/app/services/google/google.service';
import { EditMyInfosComponent } from '../../common/edit-my-infos/edit-my-infos.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    public readonly authService: AuthService,
    public readonly googleService: GoogleService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.ngxSmartModalService.create('edit-account', EditMyInfosComponent);
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
