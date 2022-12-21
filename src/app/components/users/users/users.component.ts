import { Component, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    public readonly usersService: UsersService,
    public authService: AuthService
  ) { }

  
  ngOnInit(): void {
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
