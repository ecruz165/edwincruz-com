import {NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppModule} from "./app.module";

@NgModule({
  imports: [
    AppModule,
    BrowserTransferStateModule,
    BrowserModule.withServerTransition({appId: 'serverApp'})
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {

}
