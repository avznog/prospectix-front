import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  constructor(
    public readonly usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  onChangeUserStatus(user: ProjectManager) : Subscription {
    if(user.disabled) {
      console.log("enabled");
      return this.usersService.enable(user.id);
    }else{
      console.log("disabled");
      return this.usersService.delete(user.id);
    }
    
  }

  onChangeAdmin(user: ProjectManager) : Subscription {
    return this.usersService.changeAdmin(user.id,  user.admin ? false : true);
  }
}
