import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontawesomeSetModule} from "./fontawesome/fontawesome.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AppComponent} from './app.component';
import {ProfileToolbarComponent} from './components/profile-toolbar/profile-toolbar.component';
import {AppThemeService} from "./app-theme.service";
import {TransferStateInterceptor} from "./interceptors/transfer-state.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AppSplashScreenMatrixService} from "./app-splash-screen-matrix.service";
import {FooterComponent} from "./components/footer/footer.component";
import {PagesModule} from "./pages/pages.module";
import {MaterialModule} from "./material/material.module";

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
    ProfileToolbarComponent,
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserTransferStateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FontawesomeSetModule,
    MaterialModule,
    PagesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TransferStateInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: showSplashScreen,
      multi: true,
      deps: [AppSplashScreenMatrixService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppTheme,
      multi: true,
      deps: [AppThemeService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
