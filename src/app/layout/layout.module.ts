import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileToolbarComponent} from "./profile-toolbar/profile-toolbar.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FontawesomeSetModule} from "../modules/fontawesome/fontawesome.module";
import {MaterialModule} from "../modules/material/material.module";
import {LayoutComponent} from "./layout/layout.component";
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import {ProfileCardComponent} from "../components/profile-card/profile-card.component";
import {InteractComponent} from "../components/interact/interact.component";
import {MatCardModule} from "@angular/material/card";
import {ContactMeDialogComponent} from "../components/interact/contact-me-dialog.component";
import {QRCodeModule} from "angularx-qrcode";


@NgModule({
  declarations: [
    ProfileToolbarComponent,
    FooterComponent,
    LayoutComponent,
    MainToolbarComponent,
    ProfileCardComponent,
    InteractComponent,
    ContactMeDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    MatCardModule,
    FontawesomeSetModule,
    QRCodeModule
  ]
})
export class AppLayoutModule {
}
