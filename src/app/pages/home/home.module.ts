import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../../layout/layout.module";
import {HomeComponent} from "./home.component";
import {ProfileSummaryComponent} from "../../components/profile-summary/profile-summary.component";
import {StackDetailsComponent} from "../../components/what-tech-i-use/stack-details.component";
import {StatusComponent} from "../../components/what-am-i-up-to/status.component";
import {SomeInterfaceComponent} from "../../components/some-interface/some-interface.component";
import {RecommendationsComponent} from "../../components/recommendations/recommendations.component";
import {YouTubeComponent} from "../../components/you-tube/you-tube.component";
import {WebResourcesComponent} from "../../components/what-resources-i-use/web-resources.component";
import {MaterialModule} from "../../modules/material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {PostListComponent} from "./post-list/post-list.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
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
    CommonModule,
    AppLayoutModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class HomeModule {
}
