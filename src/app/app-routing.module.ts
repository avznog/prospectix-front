import { Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks/bookmarks.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { GoalsComponent } from './components/goals/goals/goals.component';
import { MeetingsComponent } from './components/meetings/meetings/meetings.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { ResearchProspectsComponent } from './components/research-prospects/research-prospects/research-prospects.component';
import { UsersComponent } from './components/users/users/users.component';

const routes: Routes = [
  { path:"", component: DashboardComponent },
  { path:"dashboard", component: DashboardComponent },
  { path:"users", component: UsersComponent },
  { path:"reminders", component: RemindersComponent },
  { path:"meetings", component: MeetingsComponent },
  { path:"prospects", component: ResearchProspectsComponent },
  { path:"goals", component: GoalsComponent },
  { path: "bookmarks", component: BookmarksComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
