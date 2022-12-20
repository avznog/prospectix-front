import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks/bookmarks.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { GoalsComponent } from './components/goals/goals/goals.component';
import { WatchtowerComponent } from './components/goals/watchtower/watchtower.component';
import { MailTemplatesComponent } from './components/mail-templates/mail-templates/mail-templates.component';
import { MailsComponent } from './components/mails/mails/mails.component';
import { MeetingsComponent } from './components/meetings/meetings/meetings.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { ResearchComponent } from './components/research/research/research.component';
import { StatisticsComponent } from './components/statistics/statistics/statistics.component';
import { UsersComponent } from './components/users/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { LoggedGuard } from './guards/logged.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "users", component: UsersComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path: "reminders", component: RemindersComponent, canActivate: [LoggedGuard] },
  { path: "meetings", component: MeetingsComponent, canActivate: [LoggedGuard] },
  { path: "prospects", component: ResearchComponent, canActivate: [LoggedGuard] },
  { path: "bookmarks", component: BookmarksComponent, canActivate: [LoggedGuard] },
  { path: "mails", component: MailsComponent, canActivate: [LoggedGuard] },
  { path: "statistics", component: StatisticsComponent, canActivate: [LoggedGuard] },
  { path: "goals", component: GoalsComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [LoggedGuard] },
  { path: "watchtower", component: WatchtowerComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path: "mailTemplates", component: MailTemplatesComponent, canActivate: [LoggedGuard] },
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  { path: "**", pathMatch: "full", redirectTo: "dashboard"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
