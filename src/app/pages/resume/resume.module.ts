import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeComponent} from "./resume.component";

import {RouterModule, Routes} from '@angular/router';
import {ResumeLayoutComponent} from "./resume-layout.component";
import {AppLayoutModule} from "../../layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MarkdownViewerModule} from "../../modules/markdown-viewer/markdown-viewer.module";
import {FontawesomeSetModule} from "../../modules/fontawesome/fontawesome.module";


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
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    AppLayoutModule,
    MatCardModule,
    MarkdownViewerModule,
    FontawesomeSetModule
  ]
})
export class ResumeModule {
}
