import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  data: {
    user?: ProjectManager;
  } = {};
  firstname: string = "";
  lastname: string = "";
  phone: string = "";
  pseudo: string = "";
  email: string = "";
  emailCorrect: boolean = false;
  profilePictureLink: string = "";

  constructor(
    private readonly usersService: UsersService,
    private readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.data = this.ngxSmartModalService.getModalData('edit-user');
    this.firstname =this.data.user!.firstname;
    this.lastname =this.data.user!.name;
    this.phone =this.data.user!.phone;
    this.pseudo =this.data.user!.pseudo;
    this.email =this.data.user!.mail;
    this.profilePictureLink =this.data.user!.profilePictureLink;
    this.onCheckEmail();
  }

  onEditUser() {
    this.usersService.update(this.data.user!.id, {
      firstname: this.firstname,
      name: this.lastname,
      phone: this.phone,
      pseudo: this.pseudo,
      mail: this.email,
      profilePictureLink: this.profilePictureLink
    });
    this.ngxSmartModalService.closeAll();
  }

  onCheckEmail() {
    new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}").test(this.email) ? this.emailCorrect = true : this.emailCorrect = false;
  }
}
