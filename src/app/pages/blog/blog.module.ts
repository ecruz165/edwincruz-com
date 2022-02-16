import {NgModule} from '@angular/core';
import {BlogComponent} from "./blog.component";
import {RouterModule, Routes} from '@angular/router';
import {BlogLayoutComponent} from "./blog-layout.component";
import {AppLayoutModule} from "../../layout/layout.module";

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  }]

@NgModule({
  declarations: [
    BlogComponent,
    BlogLayoutComponent
  ],
  imports: [
    AppLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogModule {
}
