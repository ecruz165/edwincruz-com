import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BlogComponent} from "./blog.component";

import {RouterModule, Routes} from '@angular/router';
import {BlogLayoutComponent} from "./blog-layout.component";
import {AppLayoutModule} from "../../layout/layout.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MarkdownViewerModule} from "../../modules/markdown-viewer/markdown-viewer.module";
import {BlogListComponent} from './blog-list/blog-list.component';
import {MaterialModule} from "../../modules/material/material.module";
import {FontawesomeSetModule} from "../../modules/fontawesome/fontawesome.module";


const routes: Routes = [
  {
    path: '',
    component: BlogListComponent
  }, {
    path: ':dateString/:id',
    component: BlogComponent
  }
]

@NgModule({
  declarations: [
    BlogComponent,
    BlogLayoutComponent,
    BlogListComponent
  ],
  imports: [
    CommonModule,
    AppLayoutModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MarkdownViewerModule,
    FontawesomeSetModule,
    MaterialModule,

  ]
})
export class BlogModule {
}
