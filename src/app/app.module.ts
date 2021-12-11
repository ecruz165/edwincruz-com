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
import {WorkHistoryCarouselComponent} from './components/work-history-carousel/work-history-carousel.component';
import {ProfileSummaryComponent} from './components/profile-summary/profile-summary.component';
import {StackDetailsComponent} from './components/stack-details/stack-details.component';

import {InteractComponent} from './components/interact/interact.component';
import {StatusComponent} from './components/status/status.component';
import {PostListComponent} from './components/post-list/post-list.component';
import {RecommendationsComponent} from "./components/recommendations/recommendations.component";

@NgModule({
  declarations: [
    AppComponent,
    ProfileToolbarComponent,
    ProfileCardComponent,
    WorkHistoryCarouselComponent,
    ProfileSummaryComponent,
    StackDetailsComponent,
    InteractComponent,
    StatusComponent,
    PostListComponent,
    RecommendationsComponent
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
