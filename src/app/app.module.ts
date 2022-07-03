import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeGoalsComponent } from './components/goals/liste-goals/liste-goals.component';
import { EachGoalComponent } from './components/goals/each-goal/each-goal.component';
import { HttpClientModule } from '@angular/common/http';
import { GoalsComponent } from './components/goals/goals/goals.component';
import { CreateGoalComponent } from './components/goals/create-goal/create-goal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListeGoalsComponent,
    EachGoalComponent,
    GoalsComponent,
    CreateGoalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ListeGoalsComponent, EachGoalComponent]
})
export class AppModule { }
