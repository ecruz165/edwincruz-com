import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BlogComponent} from "./blog.component";
import {RouterModule, Routes} from '@angular/router';
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
    path: ':dateString',
    children: [
      {
        path: '',
        component: PageNotFoundComponent
      },
      {
        path: ':key',
        component: BlogComponent,
      }
    ]
  }, {
    path: '**',
    component: PageNotFoundComponent
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
