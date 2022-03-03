import {NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppThemeService} from "./app-theme.service";
import {AppSplashScreenMatrixService} from "./app-splash-screen-matrix.service";
import {AppModule} from "./app.module";
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
