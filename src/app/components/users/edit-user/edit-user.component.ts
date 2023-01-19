import { Component, Input, OnInit } from '@angular/core';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() user!: ProjectManager;
  firstname: string = "";
  lastname: string = "";
  phone: string = "";
  pseudo: string = "";
  email: string = "";
  emailCorrect: boolean = false;

  constructor(
    private readonly usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.firstname = this.user.firstname;
    this.lastname = this.user.name;
    this.phone = this.user.phone;
    this.pseudo = this.user.pseudo;
    this.email = this.user.mail;
    this.onCheckEmail();
  }

  onEditUser() {
    this.usersService.update(this.user.id, {
      firstname: this.firstname,
      name: this.lastname,
      phone: this.phone,
      pseudo: this.pseudo,
      mail: this.email
    });
  }

  onCheckEmail() {
    new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}").test(this.email) ? this.emailCorrect = true : this.emailCorrect = false;
  }
}
