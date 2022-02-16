import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeComponent} from "./resume.component";

import {RouterModule, Routes} from '@angular/router';
import {ResumeLayoutComponent} from "./resume-layout.component";
import {AppLayoutModule} from "../../layout/layout.module";


const routes: Routes = [
  {
    path: '',
    component: ResumeComponent,
  }
]

@NgModule({
  declarations: [
    ResumeComponent,
    ResumeLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppLayoutModule
  ]
})
export class ResumeModule {
}
