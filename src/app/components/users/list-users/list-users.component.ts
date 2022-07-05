import { Component, OnInit } from '@angular/core';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users!: ProjectManager[];
  constructor(
    private readonly usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.findAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

}
