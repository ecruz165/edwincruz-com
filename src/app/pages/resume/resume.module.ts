import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeComponent} from "./resume.component";

import {RouterModule, Routes} from '@angular/router';
import {ResumeLayoutComponent} from "./resume-layout.component";
import {AppLayoutModule} from "../../layout/layout.module";
import {MarkdownViewerComponent} from "../../components/markdown-viewer/markdown-viewer.component";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";


const routes: Routes = [
  {
    path: '',
    component: ResumeComponent,
  }
]

@NgModule({
  declarations: [
    ResumeComponent,
    ResumeLayoutComponent,
    MarkdownViewerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    AppLayoutModule,
    MatCardModule
  ]
})
export class ResumeModule {
}
