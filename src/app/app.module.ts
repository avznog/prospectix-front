import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { BookmarksResearchBlocComponent } from './components/bookmarks/bookmarks-research-bloc/bookmarks-research-bloc.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks/bookmarks.component';
import { EachBookmarkComponent } from './components/bookmarks/each-bookmark/each-bookmark.component';
import { ListeBookmarksComponent } from './components/bookmarks/liste-bookmarks/liste-bookmarks.component';
import { AddMeetingsDropdownComponent } from './components/common/add-meetings-dropdown/add-meetings-dropdown.component';
import { AddProspectComponent } from './components/common/add-prospect/add-prospect/add-prospect.component';
import { AddReminderDropdownComponent } from './components/common/add-reminder-dropdown/add-reminder-dropdown.component';
import { HeaderComponent } from './components/common/header/header.component';
import { ProspectHistoryComponent } from './components/common/prospect-history/prospect-history/prospect-history.component';
import { ThemePickerComponent } from './components/common/theme-picker/theme-picker.component';
import { DashboardEachGoalComponent } from './components/dashboard/dashboard-each-goal/dashboard-each-goal.component';
import { DashboardListeGoalsComponent } from './components/dashboard/dashboard-liste-goals/dashboard-liste-goals.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { CreateGoalComponent } from './components/goals/create-goal/create-goal.component';
import { EditGoalComponent } from './components/goals/edit-goal/edit-goal.component';
import { GoalResearchBlocComponent } from './components/goals/goal-research-bloc/goal-research-bloc.component';
import { GoalsComponent } from './components/goals/goals/goals.component';
import { ListeGoalsComponent } from './components/goals/liste-goals/liste-goals.component';
import { EachMeetingComponent } from './components/meetings/each-meeting/each-meeting.component';
import { MeetingsListeComponent } from './components/meetings/meetings-liste/meetings-liste.component';
import { MeetingsResearchBlocComponent } from './components/meetings/meetings-research-bloc/meetings-research-bloc.component';
import { MeetingsComponent } from './components/meetings/meetings/meetings.component';
import { ProspectDetailsComponent } from './components/prospect-details/prospect-details/prospect-details.component';
import { EachReminderComponent } from './components/reminders/each-reminder/each-reminder.component';
import { RemindersListeProspectComponent } from './components/reminders/reminders-liste-prospect/reminders-liste-prospect.component';
import { RemindersResearchBlocComponent } from './components/reminders/reminders-research-bloc/reminders-research-bloc.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { EachResearchProspectComponent } from './components/research-prospects/each-research-prospect/each-research-prospect.component';
import { ListProspectsComponent } from './components/research-prospects/list-prospects/list-prospects.component';
import { ResearchBlocComponent } from './components/research-prospects/research-bloc/research-bloc.component';
import { ResearchProspectsComponent } from './components/research-prospects/research-prospects/research-prospects.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UsersComponent } from './components/users/users/users.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent,
    RemindersResearchBlocComponent,
    RemindersListeProspectComponent,
    MeetingsComponent,
    MeetingsListeComponent,
    MeetingsResearchBlocComponent,
    ResearchProspectsComponent,
    ListProspectsComponent,
    ResearchBlocComponent,
    UsersComponent,
    ListUsersComponent,
    CreateUserComponent,
    ListeGoalsComponent,
    GoalsComponent,
    EditGoalComponent,
    DashboardComponent,
    HeaderComponent,
    CreateGoalComponent,
    DashboardListeGoalsComponent,
    DashboardEachGoalComponent,
    LoginComponent,
    AddReminderDropdownComponent,
    AddMeetingsDropdownComponent,
    BookmarksComponent,
    AddProspectComponent,
    EachReminderComponent,
    ProspectDetailsComponent,
    EachResearchProspectComponent,
    EachMeetingComponent,
    ListeBookmarksComponent,
    EachBookmarkComponent,
    BookmarksResearchBlocComponent,
    ProspectHistoryComponent,
    ThemePickerComponent,
    GoalResearchBlocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    { provide: "BASE_API_URL", useValue: environment.apiUrl },
    { provide: "DEFAULT_TIMEOUT", useValue: 30_000 },

    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
  ]
})
export class AppModule { }
