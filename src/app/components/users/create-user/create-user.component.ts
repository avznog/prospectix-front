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
      "pseudo": ["", Validators.required],
      "firstname": ["", Validators.required],
      "name": ["", Validators.required],
      "admin": [false, Validators.required]
    })
  }

  onCreateUser() : Subscription {
    const us = {
      ...this.createUserForm.value,
      currentHashedRefreshToken: "",
      mail: `${this.createUserForm.value["pseudo"]}@juniorisep.com`,
      tokenEmail: ""
    }
    console.log(us);
    return this.usersService.create(us);
  }
}
