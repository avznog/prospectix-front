import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    public readonly usersService: UsersService,
    public authService: AuthService,
    private prospectsService: ProspectsService
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
    this.prospectsService.addProspectsBase();
  }
}
