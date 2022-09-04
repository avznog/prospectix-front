import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks/bookmarks.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { GoalsComponent } from './components/goals/goals/goals.component';
import { MeetingsComponent } from './components/meetings/meetings/meetings.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { ResearchProspectsComponent } from './components/research-prospects/research-prospects/research-prospects.component';
import { UsersComponent } from './components/users/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { LoggedGuard } from './guards/logged.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent, children: [], canActivate: [LoginGuard] },
  { path:"dashboard", component: DashboardComponent, canActivate: [LoggedGuard] },
  { path:"users", component: UsersComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path:"reminders", component: RemindersComponent, canActivate: [LoggedGuard] },
  { path:"meetings", component: MeetingsComponent, canActivate: [LoggedGuard] },
  { path:"prospects", component: ResearchProspectsComponent, canActivate: [LoggedGuard] },
  { path:"goals", component: GoalsComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path: "bookmarks", component: BookmarksComponent, canActivate: [LoggedGuard] },
  { path:"", pathMatch: "full", redirectTo: "dashboard" },
  { path: "**", pathMatch: "full", redirectTo: "dashboard"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
