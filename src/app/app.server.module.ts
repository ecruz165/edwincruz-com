import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {FlexLayoutServerModule} from "@angular/flex-layout/server";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    FlexLayoutServerModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
