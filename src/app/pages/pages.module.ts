import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ResumeComponent} from './resume/resume.component';
import {BlogComponent} from './blog/blog.component';
import {ProfileCardComponent} from "../components/profile-card/profile-card.component";
import {WorkHistoryCarouselComponent} from "../components/work-history-carousel/work-history-carousel.component";
import {ProfileSummaryComponent} from "../components/profile-summary/profile-summary.component";
import {StackDetailsComponent} from "../components/stack-details/stack-details.component";
import {InteractComponent} from "../components/interact/interact.component";
import {StatusComponent} from "../components/status/status.component";
import {PostListComponent} from "../components/post-list/post-list.component";
import {RecommendationsComponent} from "../components/recommendations/recommendations.component";
import {YouTubeComponent} from "../components/you-tube/you-tube.component";
import {MaterialModule} from "../material/material.module";
import {FontawesomeSetModule} from "../fontawesome/fontawesome.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HomeComponent,
    ResumeComponent,
    BlogComponent,
    ProfileCardComponent,
    WorkHistoryCarouselComponent,
    ProfileSummaryComponent,
    StackDetailsComponent,
    InteractComponent,
    StatusComponent,
    PostListComponent,
    RecommendationsComponent,
    YouTubeComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontawesomeSetModule,
    MaterialModule,
    RouterModule,
  ]
})
export class PagesModule {
}