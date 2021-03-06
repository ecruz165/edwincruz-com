import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppThemeService} from "./app-theme.service";
import {TransferStateInterceptor} from "./interceptors/transfer-state.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppSplashScreenMatrixService} from "./app-splash-screen-matrix.service";
import {AppLayoutModule} from "./layout/layout.module";
import {HttpRequestDataService} from "./services/http-request-data.service";
import {MarkdownConverterService} from "./services/markdown-converter.service";
import {UniversalRelativeInterceptor} from "./interceptors/universal-relative.interceptor";
import {BrowserModule} from "@angular/platform-browser";
import {FlexLayoutModule} from "@angular/flex-layout";


export function showSplashScreen(splashScreenService: AppSplashScreenMatrixService) {
  return (): Promise<any> => {
    return splashScreenService.init();
  };
}

export function initializeAppTheme(appThemeService: AppThemeService) {
  return (): Promise<any> => {
    return appThemeService.Init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    AppLayoutModule,
  ],
  providers: [
    HttpRequestDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalRelativeInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: TransferStateInterceptor,
      multi: true
    },{
      provide: APP_INITIALIZER,
      useFactory: showSplashScreen,
      multi: true,
      deps: [AppSplashScreenMatrixService]
    }, {
      provide: APP_INITIALIZER,
      useFactory: initializeAppTheme,
      multi: true,
      deps: [AppThemeService]
    },
    MarkdownConverterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
