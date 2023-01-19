import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  
  pseudo: string = "";
  firstname: string = "";
  lastname: string = "";
  admin: boolean = false;
  disabled: boolean = false;
  statsEnabled: boolean = false;
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  onCreateUser() : Subscription {
    return this.usersService.create({
      firstname: this.firstname,
      name: this.lastname,
      pseudo: `${this.firstname.charAt(0)}${this.lastname}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '').trim(),
      mail: `${this.firstname.charAt(0)}${this.lastname}@juniorisep.com`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '').trim(),
      tokenEmail: "",
      admin: this.admin,
      disabled: this.disabled,
      statsEnabled: this.statsEnabled
    });
  }
}
