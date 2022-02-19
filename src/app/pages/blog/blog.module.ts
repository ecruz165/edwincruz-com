import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BlogComponent} from "./blog.component";

import {RouterModule, Routes} from '@angular/router';
import {BlogLayoutComponent} from "./blog-layout.component";
import {AppLayoutModule} from "../../layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MarkdownViewerModule} from "../../modules/markdown-viewer/markdown-viewer.module";


const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  }
]

@NgModule({
  declarations: [
    BlogComponent,
    BlogLayoutComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    AppLayoutModule,
    MatCardModule,
    MarkdownViewerModule
  ]
})
export class BlogModule {
}
