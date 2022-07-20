import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemindersComponent } from './components/reminders/reminders/reminders.component';
import { RemindersResearchBlocComponent } from './components/reminders/reminders-research-bloc/reminders-research-bloc.component';
import { RemindersListeProspectComponent } from './components/reminders/reminders-liste-prospect/reminders-liste-prospect.component';
import { EachProspectComponent } from './components/common/each-prospect/each-prospect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MeetingsComponent } from './components/meetings/meetings/meetings.component';
import { MeetingsListeProspectComponent } from './components/meetings/meetings-liste-prospect/meetings-liste-prospect.component';
import { MeetingsResearchBlocComponent } from './components/meetings/meetings-research-bloc/meetings-research-bloc.component';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent,
    RemindersResearchBlocComponent,
    EachProspectComponent,
    RemindersListeProspectComponent,
    MeetingsComponent,
    MeetingsListeProspectComponent,
    MeetingsResearchBlocComponent,
    EachProspectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
