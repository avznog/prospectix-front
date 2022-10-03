import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks/bookmarks.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { GoalsComponent } from './components/goals/goals/goals.component';
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
  { path: "login", component: LoginComponent, children: [], canActivate: [LoginGuard] },
  // { path:"dashboard", component: DashboardComponent, canActivate: [LoggedGuard] },
  { path:"users", component: UsersComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path:"reminders", component: RemindersComponent, canActivate: [LoggedGuard] },
  { path:"meetings", component: MeetingsComponent, canActivate: [LoggedGuard] },
  { path:"prospects", component: ResearchComponent, canActivate: [LoggedGuard] },
  // { path:"goals", component: GoalsComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path: "bookmarks", component: BookmarksComponent, canActivate: [LoggedGuard] },
  { path: "mails", component: MailsComponent, canActivate: [LoggedGuard] },
  { path: "statistics", component: StatisticsComponent, canActivate: [LoggedGuard] },
  { path:"", pathMatch: "full", redirectTo: "prospects" },
  { path: "**", pathMatch: "full", redirectTo: "prospects"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
