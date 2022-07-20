import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-each-user',
  templateUrl: './each-user.component.html',
  styleUrls: ['./each-user.component.scss']
})
export class EachUserComponent implements OnInit {
  @Input() user!: ProjectManager;
  constructor(
    private readonly usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  onDeleteUser() : Subscription {
    if(this.user.disabled) {
      console.log("enabled");
      return this.usersService.enable(this.user.id);
    }else{
      console.log("disabled");
      return this.usersService.delete(this.user.id);
    }
    
  }

  onChangeAdmin() : Subscription {
    console.log("changed admin")
    return this.usersService.changeAdmin(this.user.id,  this.user.admin ? false : true);
  }

}
