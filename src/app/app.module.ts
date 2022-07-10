import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { RemindersResearchBlocComponent } from './components/reminders/reminders-research-bloc/reminders-research-bloc.component';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent,
    RemindersResearchBlocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
