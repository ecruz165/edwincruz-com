import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeComponent} from "./resume.component";
import {RouterModule, Routes} from '@angular/router';
import {ResumeLayoutComponent} from "./resume-layout.component";
import {AppLayoutModule} from "../../layout/layout.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FontawesomeSetModule} from "../../modules/fontawesome/fontawesome.module";
import {MaterialModule} from "../../modules/material/material.module";


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
    AppLayoutModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    FontawesomeSetModule,
    MaterialModule,
  ]
})
export class ResumeModule {
}
