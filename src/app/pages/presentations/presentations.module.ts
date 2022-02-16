import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PresentationsComponent} from "./presentations.component";
import {SlidesComponent} from '../../components/slides/slides.component';

import {RouterModule, Routes} from '@angular/router';
import {PresentationsLayoutComponent} from "./presentations-layout.component";
import {AppLayoutModule} from "../../layout/layout.module";


const routes: Routes = [
  {
    path: '',
    component: PresentationsComponent
  }
];

@NgModule({
  declarations: [
    SlidesComponent,
    PresentationsComponent,
    PresentationsLayoutComponent
  ],
  imports: [
    AppLayoutModule,
    RouterModule.forChild(routes),

  ]
})
export class PresentationsModule {
}
