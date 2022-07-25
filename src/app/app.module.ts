import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { RemindersResearchBlocComponent } from './components/reminders/reminders-research-bloc/reminders-research-bloc.component';
import { RemindersListeProspectComponent } from './components/reminders/reminders-liste-prospect/reminders-liste-prospect.component';
import { MeetingsComponent } from './components/meetings/meetings/meetings.component';
import { MeetingsListeProspectComponent } from './components/meetings/meetings-liste-prospect/meetings-liste-prospect.component';
import { MeetingsResearchBlocComponent } from './components/meetings/meetings-research-bloc/meetings-research-bloc.component';
import { ResearchProspectsComponent } from './components/research-prospects/research-prospects/research-prospects.component';
import { ListProspectsComponent } from './components/research-prospects/list-prospects/list-prospects.component';
import { EachProspectComponent } from './components/common/each-prospect/each-prospect.component';
import { ResearchBlocComponent } from './components/research-prospects/research-bloc/research-bloc.component';
import { UsersComponent } from './components/users/users/users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { EachUserComponent } from './components/users/each-user/each-user.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ListeGoalsComponent } from './components/goals/liste-goals/liste-goals.component';
import { EachGoalComponent } from './components/goals/each-goal/each-goal.component';
import { GoalsComponent } from './components/goals/goals/goals.component';
import { CreateGoalComponent } from './components/goals/create-goal/create-goal.component';
import { EditGoalComponent } from './components/goals/edit-goal/edit-goal.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './components/common/header/header/header.component';
import { EachProspectChangeParameterComponent } from './components/common/each-prospect-change-parameter/each-prospect-change-parameter.component';
import { ThemesDropdownComponent } from './components/common/header/themes-dropdown/themes-dropdown.component';
import { DashboardListeGoalsComponent } from './components/dashboard/dashboard-liste-goals/dashboard-liste-goals.component';
import { DashboardEachGoalComponent } from './components/dashboard/dashboard-each-goal/dashboard-each-goal.component';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent,
    RemindersResearchBlocComponent,
    RemindersListeProspectComponent,
    MeetingsComponent,
    MeetingsListeProspectComponent,
    MeetingsResearchBlocComponent,
    EachProspectComponent,
    ResearchProspectsComponent,
    ListProspectsComponent,
    ResearchBlocComponent,
    UsersComponent,
    ListUsersComponent,
    EachUserComponent,
    CreateUserComponent,
    ListeGoalsComponent,
    EachGoalComponent,
    GoalsComponent,
    CreateGoalComponent,
    EditGoalComponent,
    DashboardComponent,
    HeaderComponent,
    EachProspectChangeParameterComponent,
    ThemesDropdownComponent,
    DashboardListeGoalsComponent,
    DashboardEachGoalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
