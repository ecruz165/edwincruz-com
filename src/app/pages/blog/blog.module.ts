import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BlogComponent} from "./blog.component";
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {AppLayoutModule} from "../../layout/layout.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BlogListComponent} from './blog-list/blog-list.component';
import {MaterialModule} from "../../modules/material/material.module";
import {PageNotFoundComponent} from "../error/page-not-found/page-not-found.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlogListComponent,
  },
  {
    matcher: (url) => {
      if (url.length === 1 ) {
        return {
          consumed: url,
          posParams: {
            key: new UrlSegment(url[0].path, {})
          }
        };
      }

      return null;
    },
    component: BlogComponent
  }
]

@NgModule({
  declarations: [
    BlogComponent,
    BlogListComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    AppLayoutModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class BlogModule {
}
