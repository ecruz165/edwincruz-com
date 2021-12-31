import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FontawesomeSetModule} from "./fontawesome/fontawesome.module";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AppComponent} from './app.component';

import {ProfileToolbarComponent} from './components/profile-toolbar/profile-toolbar.component';
import {ProfileCardComponent} from './components/profile-card/profile-card.component';
import {WorkHistoryCarouselComponent} from './components/work-history-carousel/work-history-carousel.component';
import {ProfileSummaryComponent} from './components/profile-summary/profile-summary.component';
import {StackDetailsComponent} from './components/stack-details/stack-details.component';

import {InteractComponent} from './components/interact/interact.component';
import {StatusComponent} from './components/status/status.component';
import {PostListComponent} from './components/post-list/post-list.component';
import {RecommendationsComponent} from "./components/recommendations/recommendations.component";
import {YouTubeComponent} from './components/you-tube/you-tube.component';
import {AppThemeService} from "./app-theme.service";
import {TransferStateInterceptor} from "./interceptors/transfer-state.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {SplashScreenService} from "./app-splash-screen.service";

export function showSplashScreen(splashScreenService: SplashScreenService) {
  return (): Promise<any> => {
    return splashScreenService.Init();
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
    ProfileToolbarComponent,
    ProfileCardComponent,
    WorkHistoryCarouselComponent,
    ProfileSummaryComponent,
    StackDetailsComponent,
    InteractComponent,
    StatusComponent,
    PostListComponent,
    RecommendationsComponent,
    YouTubeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserTransferStateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FontawesomeSetModule,
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
      deps: [SplashScreenService]
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
