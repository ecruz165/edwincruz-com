import {Inject, Injectable, Injector, Optional, PLATFORM_ID, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT, isPlatformBrowser, isPlatformServer} from "@angular/common";
import {REQUEST} from "@nguniversal/express-engine/tokens";
import {getSunrise, getSunset} from 'sunrise-sunset-js';

interface IThemeMode {
  name: string
  file_name: string
}

interface ITheme {
  name: string
  modes: IThemeMode[];
}

interface ITenantConfig {
  assets_folder: string,
  themes: ITheme[],
}

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {

  private renderer: Renderer2;
  // default location is New York, NY
  latitude: number = 40.8393845;
  longitude: number = -73.9414518;

  constructor(
    private injector: Injector,
    @Optional() @Inject(REQUEST) private request: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private getTenantThemeConfig(): ITenantConfig {
    // this can contain service call to pull theme config from service
    // or can determine tenant based on url
    return {
      assets_folder: "/",
      themes: [
        {
          name: "default",
          modes: [
            {
              name: "day-time",
              file_name: "/light-theme.css"
            }, {
              name: "night-time",
              file_name: "/dark-theme.css"
            }
          ]
        }
      ]
    };
  }

  private getBaseUrl(): string {
    let baseUrl = '';
    if (isPlatformBrowser(this.platformId)) {
      const location = window.location;
      baseUrl = `${location.protocol}//${location.hostname}${location.port === "80" ? "" : ":" + location.port}`;
    } else if (isPlatformServer(this.platformId)) {
      const request = this.injector.get(REQUEST);
      baseUrl = `${request.protocol}://${request.header("x-forwarded-host")}`;
    }
    return baseUrl;
  }

  private onPositionError() {
    // default location is New York, NY
  }

  private onPositionSuccess(position: GeolocationPosition) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude
  }

  private detectCurrentPosition() {
    if (isPlatformServer(this.platformId)) {
      // use the default
    } else {
      navigator.geolocation.getCurrentPosition(this.onPositionSuccess, this.onPositionError);
    }
  }

  private getTimeOfDay() {
    const position = this.detectCurrentPosition();
    const sunrise = getSunrise(this.latitude, this.longitude);
    const sunset = getSunset(this.latitude, this.longitude);
    const now = new Date();
    if (now >= sunrise && now < sunset) return 'day-time';
    return 'night-time'
  }

  private getTheme(config: ITenantConfig) {
    // some logic to determine which mode to select base on whether client is in daytime or nighttime
    let timeOfDay = this.getTimeOfDay();
    if (timeOfDay === 'day-time')
      return '/light-theme.css';
    return '/dark-theme.css';
  }

  private loadStylesheet(id: string, baseUrl: string, path: string, renderOnServer: boolean, renderOnBrowser: boolean) {
    const head = this.document.getElementsByTagName('head')[0];
    let link = this.document.getElementById(id) as HTMLLinkElement;
    if (link) {
      if (renderOnBrowser && isPlatformBrowser(this.platformId)) {
        link.href = `${baseUrl}${path}`;
      } else if (renderOnServer && isPlatformServer(this.platformId)) {
        link.href = `${baseUrl}${path}`;
      }
    } else {
      link = this.document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = `${baseUrl}${path}`;
      link.media = 'all'
      link.type = 'text/css'

      if (renderOnBrowser && isPlatformBrowser(this.platformId)) {
        head.appendChild(link);
      } else if (renderOnServer && isPlatformServer(this.platformId)) {
        //  this.renderer.insertBefore(this.document.head,  link, this.document.head.firstChild);
        //  this.renderer.insertBefore(this.document.head, link, this.document.head.lastElementChild);
        this.renderer.appendChild(head, link);
      }
    }
  }

  toggleLightAndDarkTheme() {

  }

  Init() {
    const tenantConfig = this.getTenantThemeConfig();
    const themePathFromContextRoot = this.getTheme(tenantConfig);
    const baseUrl = this.getBaseUrl();
    this.loadStylesheet('app-styles', baseUrl, `/styles.css`, true, true);
    this.loadStylesheet('app-theme', baseUrl, `${themePathFromContextRoot}`, true, true);
    return Promise.resolve();
  }

}
