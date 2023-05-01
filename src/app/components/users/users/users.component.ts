import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    public readonly usersService: UsersService,
    public authService: AuthService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  
  ngOnInit(): void {
    this.ngxSmartModalService.create('add-user', CreateUserComponent).addCustomClass('add-user').closable = false;
  }

  pageUp() {
    this.usersService.updateSearchParameters({
      ...this.usersService.researchParamsUsers,
      skip: this.usersService.researchParamsUsers.skip + 20
    });
  }

  pageDown() {
    this.usersService.updateSearchParameters({
      ...this.usersService.researchParamsUsers,
      skip: this.usersService.researchParamsUsers.skip - 20
    });
  }


  onClickAddProspectsBase() {
    // this.prospectsService.addProspectsBase();
  }

  onClickAddEvents() {
    // this.prospectsService.addEvents();
  }

}
