import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditGoalComponent } from './components/goals/edit-goal/edit-goal.component';

const routes: Routes = [
  { path: "edit-goal", component: EditGoalComponent },
  { path: "", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
