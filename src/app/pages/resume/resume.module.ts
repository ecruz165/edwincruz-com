import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeComponent} from "./resume.component";
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutModule} from "../../layout/layout.module";
import {FlexLayoutModule} from "@angular/flex-layout";
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
  ],
  imports: [
    CommonModule,
    AppLayoutModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class ResumeModule {
}
