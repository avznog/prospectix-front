import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
