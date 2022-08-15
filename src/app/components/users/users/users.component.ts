import { Component, OnInit } from '@angular/core';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { ResearchParamsUsers } from 'src/app/models/research-params-users.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  researchParamsUsers: ResearchParamsUsers = {
    take: 2,
    skip: 0
  }
  users!: ProjectManager[];
  constructor(
    private readonly usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.findAllPaginated(this.researchParamsUsers)
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  pageUp() {
    this.updateResearchParamsUsers({
      ...this.researchParamsUsers,
      skip: this.researchParamsUsers.skip + 2
    });
  }

  pageDown() {
    this.updateResearchParamsUsers({
      ...this.researchParamsUsers,
      skip: this.researchParamsUsers.skip - 2
    });
  }

  updateUsers(researchParamsUsers: ResearchParamsUsers) {
    this.usersService.findAllPaginated(researchParamsUsers)
    .subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  updateResearchParamsUsers(newResearchParamsUsers: ResearchParamsUsers) {
    this.researchParamsUsers = newResearchParamsUsers;
    this.updateUsers(this.researchParamsUsers);
  }
}
