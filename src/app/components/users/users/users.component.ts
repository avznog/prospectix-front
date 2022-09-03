import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    public readonly usersService: UsersService
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
}
