import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { BookmarksResearchBlocComponent } from './components/bookmarks/bookmarks-research-bloc/bookmarks-research-bloc.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks/bookmarks.component';
import { ChangelogsComponent } from './components/changelogs/changelogs.component';
import { AddBookmarkModalComponent } from './components/common/add-bookmark-modal/add-bookmark-modal.component';
import { AddMailModalComponent } from './components/common/add-mail-modal/add-mail-modal.component';
import { AddMeetingsModalComponent } from './components/common/add-meetings-modal/add-meetings-modal.component';
import { AddProspectComponent } from './components/common/add-prospect/add-prospect.component';
import { AddReminderModalComponent } from './components/common/add-reminder-modal/add-reminder-modal.component';
import { ConfirmProComponent } from './components/common/confirm-pro/confirm-pro.component';
import { ConfirmRefusComponent } from './components/common/confirm-refus/confirm-refus.component';
import { DisableProspectModalComponent } from './components/common/disable-prospect-modal/disable-prospect-modal.component';
import { HeaderComponent } from './components/common/header/header.component';
import { MarkMeetingDoneAndOutComponent } from './components/common/mark-meeting-done-and-out/mark-meeting-done-and-out.component';
import { NoResultComponent } from './components/common/no-result/no-result/no-result.component';
import { ProspectHistoryComponent } from './components/common/prospect-history/prospect-history/prospect-history.component';
import { ProspectTileComponent } from './components/common/prospect-tile/prospect-tile.component';
import { ProspectixLogoComponent } from './components/common/prospectix-logo/prospectix-logo.component';
import { StatsSmallCardComponent } from './components/common/stats-small-card/stats-small-card.component';
import { ThemePickerComponent } from './components/common/theme-picker/theme-picker.component';
import { MailsResearchBlocComponent } from './components/mails/mails-research-bloc/mails-research-bloc.component';
import { MailsComponent } from './components/mails/mails/mails.component';
import { MeetingsResearchBlocComponent } from './components/meetings/meetings-research-bloc/meetings-research-bloc.component';
import { MeetingsComponent } from './components/meetings/meetings/meetings.component';
import { ProspectEditComponent } from './components/prospect-edit/prospect-edit.component';
import { RemindersResearchBlocComponent } from './components/reminders/reminders-research-bloc/reminders-research-bloc.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { ResearchBlocComponent } from './components/research/research-bloc/research-bloc.component';
import { ResearchComponent } from './components/research/research/research.component';
import { ActivityComponent } from './components/statistics/activity/activity.component';
import { MyStatsComponent } from './components/statistics/my-stats/my-stats.component';
import { RankingComponent } from './components/statistics/ranking/ranking.component';
import { StatisticsComponent } from './components/statistics/statistics/statistics.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UsersComponent } from './components/users/users/users.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { FrenchDatePipePipe } from './pipes/french-date/french-date-pipe.pipe';
import { ShortFrenchDatePipe } from './pipes/short-french-date/short-french-date.pipe';
import { GoalsComponent } from './components/goals/goals/goals.component';
import { AddGoalTemplateComponent } from './components/goals/add-goal-template/add-goal-template.component';
import { EditGoalTemplateComponent } from './components/goals/edit-goal-template/edit-goal-template.component';
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
    HeaderComponent,
    LoginComponent,
    AddReminderModalComponent,
    AddMeetingsModalComponent,
    BookmarksComponent,
    AddProspectComponent,
    ProspectEditComponent,
    BookmarksResearchBlocComponent,
    ProspectHistoryComponent,
    ThemePickerComponent,
    ChangelogsComponent,
    NoResultComponent,
    MailsComponent,
    MailsResearchBlocComponent,
    ProspectTileComponent,
    StatisticsComponent,
    AddBookmarkModalComponent,
    AddMailModalComponent,
    DisableProspectModalComponent,
    FrenchDatePipePipe,
    ShortFrenchDatePipe,
    ConfirmRefusComponent,
    StatsSmallCardComponent,
    ConfirmProComponent,
    MarkMeetingDoneAndOutComponent,
    RankingComponent,
    MyStatsComponent,
    ActivityComponent,
    ProspectixLogoComponent,
    GoalsComponent,
    AddGoalTemplateComponent,
    EditGoalTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
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
export class AppModule { 
  constructor() {
    registerLocaleData(fr.default)
  }
}
