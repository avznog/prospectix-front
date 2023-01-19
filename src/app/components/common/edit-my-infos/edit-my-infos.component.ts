import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-edit-my-infos',
  templateUrl: './edit-my-infos.component.html',
  styleUrls: ['./edit-my-infos.component.scss']
})
export class EditMyInfosComponent implements OnInit {

  phone: string = ""

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.phone = this.authService.currentUserSubject.getValue().phone
  }

  onEditInfos() {
    this.usersService.update(this.authService.currentUserSubject.getValue().id, {
      phone: this.phone
    })
  }
}
