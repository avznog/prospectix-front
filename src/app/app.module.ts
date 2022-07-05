import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users/users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { EachUserComponent } from './components/users/each-user/each-user.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ListUsersComponent,
    EachUserComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
