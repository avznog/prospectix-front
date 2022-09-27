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
import { AddProspectComponent } from './components/common/add-prospect/add-prospect.component';
import { AddReminderModalComponent } from './components/common/add-reminder-modal/add-reminder-modal.component';
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
import { MeetingsResearchBlocComponent } from './components/meetings/meetings-research-bloc/meetings-research-bloc.component';
import { MeetingsComponent } from './components/meetings/meetings/meetings.component';
import { ProspectEditComponent } from './components/prospect-edit/prospect-edit.component';
import { RemindersResearchBlocComponent } from './components/reminders/reminders-research-bloc/reminders-research-bloc.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { ResearchBlocComponent } from './components/research/research-bloc/research-bloc.component';
import { ResearchComponent } from './components/research/research/research.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UsersComponent } from './components/users/users/users.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ChangelogsComponent } from './components/changelogs/changelogs.component';
import { NoResultComponent } from './components/common/no-result/no-result/no-result.component';
import { DashboardListeRemindersComponent } from './components/dashboard/dashboard-liste-reminders/dashboard-liste-reminders.component';
import { DashboardEachReminderComponent } from './components/dashboard/dashboard-each-reminder/dashboard-each-reminder.component';
import { AddMeetingsModalComponent } from './components/common/add-meetings-modal/add-meetings-modal.component';
import { MailsComponent } from './components/mails/mails/mails.component';
import { MailsResearchBlocComponent } from './components/mails/mails-research-bloc/mails-research-bloc.component';
import { ProspectTileComponent } from './components/common/prospect-tile/prospect-tile.component';
import { StatisticsComponent } from './components/statistics/statistics/statistics.component';
import { AddBookmarkModalComponent } from './components/common/add-bookmark-modal/add-bookmark-modal.component';
import { AddMailModalComponent } from './components/common/add-mail-modal/add-mail-modal.component';
import { DisableProspectModalComponent } from './components/common/disable-prospect-modal/disable-prospect-modal.component';
import { FrenchDatePipePipe } from './pipes/french-date-pipe.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent,
    RemindersResearchBlocComponent,
    MeetingsComponent,
    MeetingsResearchBlocComponent,
    ResearchComponent,
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
    AddReminderModalComponent,
    AddMeetingsModalComponent,
    BookmarksComponent,
    AddProspectComponent,
    ProspectEditComponent,
    BookmarksResearchBlocComponent,
    ProspectHistoryComponent,
    ThemePickerComponent,
    GoalResearchBlocComponent,
    ChangelogsComponent,
    NoResultComponent,
    DashboardListeRemindersComponent,
    DashboardEachReminderComponent,
    MailsComponent,
    MailsResearchBlocComponent,
    ProspectTileComponent,
    StatisticsComponent,
    AddBookmarkModalComponent,
    AddMailModalComponent,
    DisableProspectModalComponent,
    FrenchDatePipePipe
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
    DatePipe,

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
