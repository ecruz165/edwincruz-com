import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../../layout/layout.module";
import {HomeComponent} from "./home.component";
import {WorkHistoryCarouselComponent} from "../../components/work-history-carousel/work-history-carousel.component";
import {ProfileSummaryComponent} from "../../components/profile-summary/profile-summary.component";
import {StackDetailsComponent} from "../../components/stack-details/stack-details.component";
import {StatusComponent} from "../../components/status/status.component";
import {PostListComponent} from "../../components/post-list/post-list.component";
import {SomeInterfaceComponent} from "../../components/some-interface/some-interface.component";
import {RecommendationsComponent} from "../../components/recommendations/recommendations.component";
import {YouTubeComponent} from "../../components/you-tube/you-tube.component";
import {WebResourcesComponent} from "../../components/web-resources/web-resources.component";
import {MaterialModule} from "../../modules/material/material.module";
import {FontawesomeSetModule} from "../../modules/fontawesome/fontawesome.module";
import {FlexLayoutModule} from "@angular/flex-layout";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,

    WorkHistoryCarouselComponent,
    ProfileSummaryComponent,
    StackDetailsComponent,
    StatusComponent,
    PostListComponent,
    SomeInterfaceComponent,
    RecommendationsComponent,
    YouTubeComponent,
    WebResourcesComponent
  ],
  imports: [
    AppLayoutModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    FontawesomeSetModule,
  ]
})
export class HomeModule {
}
