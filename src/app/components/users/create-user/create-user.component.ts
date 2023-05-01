import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DataThemeService } from 'src/app/services/common/data-theme.service';
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
  phone: string = "";
  admin: boolean = false;
  disabled: boolean = false;
  statsEnabled: boolean = false;
  profilePictureLink: string = "";

  constructor(
    private readonly usersService: UsersService,
    private readonly ngxSmartModalService: NgxSmartModalService,
    public readonly dataThemeService: DataThemeService
  ) { }

  ngOnInit(): void {
  }

  onCreateUser() {
    this.usersService.create({
      firstname: this.firstname,
      name: this.lastname,
      pseudo: `${this.firstname.charAt(0)}${this.lastname}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '').trim(),
      mail: `${this.firstname.charAt(0)}${this.lastname}@juniorisep.com`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '').trim(),
      phone: this.phone,
      tokenGoogle: "",
      admin: this.admin,
      disabled: this.disabled,
      statsEnabled: this.statsEnabled,
      profilePictureLink: this.profilePictureLink
    });
    this.ngxSmartModalService.closeAll()
  }
}
