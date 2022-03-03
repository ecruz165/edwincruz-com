import {NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppModule} from "./app.module";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  imports: [
    AppModule,
    BrowserModule,
    BrowserTransferStateModule,
    FlexLayoutModule,
    BrowserModule.withServerTransition({appId: 'serverApp'})
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {

}
