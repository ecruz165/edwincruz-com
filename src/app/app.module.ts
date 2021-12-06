import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FontawesomeSetModule} from "./fontawesome/fontawesome.module";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";

import {AppComponent} from './app.component';

import {ProfileToolbarComponent} from './components/profile-toolbar/profile-toolbar.component';
import {ProfileCardComponent} from './components/profile-card/profile-card.component';
import {ResumeCardComponent} from './components/resume-card/resume-card.component';
import {WorkHistoryCarouselComponent} from './components/work-history-carousel/work-history-carousel.component';
import {ProfileSummaryComponent} from './components/profile-summary/profile-summary.component';
import {StackDetailsComponent} from './components/stack-details/stack-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileToolbarComponent,
    ProfileCardComponent,
    ResumeCardComponent,
    WorkHistoryCarouselComponent,
    ProfileSummaryComponent,
    StackDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    FlexModule,
    ExtendedModule,
    FontawesomeSetModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
