import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileToolbarComponent} from "./profile-toolbar/profile-toolbar.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FontawesomeSetModule} from "../modules/fontawesome/fontawesome.module";
import {MaterialModule} from "../modules/material/material.module";
import {LayoutComponent} from "./layout/layout.component";


@NgModule({
  declarations: [
    ProfileToolbarComponent,
    FooterComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    FontawesomeSetModule
  ]
})
export class AppLayoutModule {
}
