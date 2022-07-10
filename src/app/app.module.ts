import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { EachGoalComponent } from './components/dashboard/each-goal/each-goal.component';
import { ListeGoalsComponent } from './components/dashboard/liste-goals/liste-goals.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EachGoalComponent,
    ListeGoalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
