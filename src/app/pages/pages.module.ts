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
import {MaterialModule} from "../modules/material/material.module";
import {FontawesomeSetModule} from "../modules/fontawesome/fontawesome.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {SomeInterfaceComponent} from "../components/some-interface/some-interface.component";
import {IntentDetectionModule} from "../modules/intent-detection/intent-detection.module";
import {SlidesComponent} from "../components/slides/slides.component";
import {PresentationsComponent} from './presentations/presentations.component';
import {VisibilityCloakModule} from "../modules/visibility-cloak/visibility-cloak.module";

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
    SomeInterfaceComponent,
    RecommendationsComponent,
    YouTubeComponent,
    SlidesComponent,
    PresentationsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontawesomeSetModule,
    MaterialModule,
    RouterModule,
    IntentDetectionModule,
    VisibilityCloakModule,
  ],
  exports: []
})
export class PagesModule {
}
