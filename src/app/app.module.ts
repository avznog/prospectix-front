import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ResearchProspectsComponent } from './components/research-prospects/research-prospects/research-prospects.component';
import { ListProspectsComponent } from './components/research-prospects/list-prospects/list-prospects.component';
import { EachProspectComponent } from './components/research-prospects/each-prospect/each-prospect.component';
import { ResearchBlocComponent } from './components/research-prospects/research-bloc/research-bloc.component';

@NgModule({
  declarations: [
    AppComponent,
    ResearchProspectsComponent,
    ListProspectsComponent,
    EachProspectComponent,
    ResearchBlocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ResearchBlocComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
