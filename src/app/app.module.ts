import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgChartsModule } from 'ng2-charts';
import { QuillModule } from 'ngx-quill';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment.dev';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './components/account/account/account.component';
import { BackofficeSearchComponent } from './components/backoffice-search/backoffice-search/backoffice-search.component';
import { BookmarksResearchBlocComponent } from './components/bookmarks/bookmarks-research-bloc/bookmarks-research-bloc.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks/bookmarks.component';
import { ChangelogsComponent } from './components/changelogs/changelogs.component';
import { ActionProspectComponent } from './components/common/action-prospect/action-prospect.component';
import { AddCityComponent } from './components/common/add-city/add-city.component';
import { AddMeetingAndReminderComponent } from './components/common/add-meeting-and-reminder/add-meeting-and-reminder.component';
import { AddProspectComponent } from './components/common/add-prospect/add-prospect.component';
import { EditDateReminderMeetingComponent } from './components/common/edit-date-reminder-meeting/edit-date-reminder-meeting.component';
import { EditMyInfosComponent } from './components/common/edit-my-infos/edit-my-infos.component';
import { HeaderComponent } from './components/common/header/header.component';
import { MarkSentEmailSentComponent } from './components/common/mark-sent-email-sent/mark-sent-email-sent.component';
import { NoResultComponent } from './components/common/no-result/no-result/no-result.component';
import { ProspectHistoryComponent } from './components/common/prospect-history/prospect-history/prospect-history.component';
import { ProspectTileComponent } from './components/common/prospect-tile/prospect-tile.component';
import { ProspectixLogoComponent } from './components/common/prospectix-logo/prospectix-logo.component';
import { StatsSmallCardComponent } from './components/common/stats-small-card/stats-small-card.component';
import { ThemePickerComponent } from './components/common/theme-picker/theme-picker.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddGoalTemplateComponent } from './components/goals/add-goal-template/add-goal-template.component';
import { DeleteGoalTemplateComponent } from './components/goals/delete-goal-template/delete-goal-template.component';
import { EditGoalTemplateComponent } from './components/goals/edit-goal-template/edit-goal-template.component';
import { GoalsComponent } from './components/goals/goals/goals.component';
import { WatchtowerComponent } from './components/goals/watchtower/watchtower.component';
import { Oauth2callbackComponent } from './components/google/oauth2callback/oauth2callback.component';
import { DisplayMailTemplateComponent } from './components/mail-templates/display-mail-template/display-mail-template.component';
import { MailTemplatesComponent } from './components/mail-templates/mail-templates/mail-templates.component';
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
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UsersComponent } from './components/users/users/users.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { FrenchDatePipePipe } from './pipes/french-date/french-date-pipe.pipe';
import { ShortFrenchDatePipe } from './pipes/short-french-date/short-french-date.pipe';
import { VersionComponent } from './components/common/version/version.component';
import { SortingCitiesPipe } from './pipes/sorting-cities/sorting-cities.pipe';

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
    FrenchDatePipePipe,
    ShortFrenchDatePipe,
    StatsSmallCardComponent,
    RankingComponent,
    MyStatsComponent,
    ActivityComponent,
    ProspectixLogoComponent,
    EditDateReminderMeetingComponent,
    MarkSentEmailSentComponent,
    AddCityComponent,
    GoalsComponent,
    AddGoalTemplateComponent,
    EditGoalTemplateComponent,
    DeleteGoalTemplateComponent,
    DashboardComponent,
    WatchtowerComponent,
    MailTemplatesComponent,
    DisplayMailTemplateComponent,
    EditUserComponent,
    AccountComponent,
    EditMyInfosComponent,
    Oauth2callbackComponent,
    BackofficeSearchComponent,
    ActionProspectComponent,
    AddMeetingAndReminderComponent,
    VersionComponent,
    SortingCitiesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    NgxSmartModalModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': ["justify"] }],
          ['clean'],
          ['link']
        ]
      },
      suppressGlobalRegisterWarning: true
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
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
