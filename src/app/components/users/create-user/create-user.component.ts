import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createUserForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      pseudo: ["", Validators.required],
      firstname: ["", Validators.required],
      name: ["", Validators.required],
      admin: [false, Validators.required],
      disabled: [false, Validators.required]
    })
  }

  onCreateUser() : Subscription {
    const us = {
      ...this.createUserForm.value,
      pseudo: `${this.createUserForm.value["firstname"].charAt(0)}${this.createUserForm.value["name"]}`.toLowerCase().replace(/\s/g, '').trim(),
      currentHashedRefreshToken: "",
      mail: `${this.createUserForm.value["firstname"].charAt(0)}${this.createUserForm.value["name"]}@juniorisep.com`.toLowerCase().replace(/\s/g, '').trim(),
      tokenEmail: ""
    }
    console.log(us);
    return this.usersService.create(us);
  }
}
