import {Inject, Injectable, Injector, Optional, PLATFORM_ID, Renderer2, RendererFactory2} from '@angular/core';
import {APP_BASE_HREF, DOCUMENT, isPlatformBrowser, isPlatformServer} from "@angular/common";
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import {getSunrise, getSunset} from 'sunrise-sunset-js';
import {BehaviorSubject, filter, Observable} from "rxjs";
import {HttpRequestDataService} from "./services/http-request-data.service";

interface IThemeMode {
  is_dark: boolean;
  name: string;
  file_name: string;
}

interface ITheme {
  name: string;
  modes: IThemeMode[];
}

interface ITenantConfig {
  assets_folder: string;
  themes: ITheme[];
}

let latitude: number = 40.8393845;
let longitude: number = -73.9414518;

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {

  private renderer: Renderer2;
  private themeConfig: ITenantConfig | undefined;
  private currentTheme: ITheme | undefined;
  private currentThemeMode?: IThemeMode;

  private themeBS: BehaviorSubject<IThemeMode> = new BehaviorSubject<any>(null);
  public theme$: Observable<IThemeMode> = this.themeBS.asObservable().pipe(filter((val) => !!val));

  constructor(
    private httpRequestDataService: HttpRequestDataService,
    private injector: Injector,
    @Optional() @Inject(APP_BASE_HREF) private appBaseHref: any,
    @Optional() @Inject('serverUrl') private serverUrl: string,
    @Optional() @Inject(REQUEST) private request: Request,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleThemeMode() {
    this.currentThemeMode = this.currentTheme?.modes.filter(mode => mode.is_dark !== this.currentThemeMode?.is_dark)[0];
    this.setThemeMode(this.currentTheme, this.currentThemeMode);
  }

  Init() {
    this.themeConfig = this.getTenantThemeConfig();
    this.currentTheme = this.getTheme(this.themeConfig, this.getDefaultThemeName());
    this.currentThemeMode = this.getThemeMode(this.currentTheme, this.getDefaultThemeModeName());
    this.setThemeMode(this.currentTheme, this.currentThemeMode);
    return Promise.resolve();

  }

  getCurrentMode() {
    return this.currentThemeMode;
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
              is_dark: false,
              name: "day-time",
              file_name: "light-theme.css"
            }, {
              is_dark: true,
              name: "night-time",
              file_name: "dark-theme.css"
            }
          ]
        }
      ]
    };
  }


  private getBaseUrl(): string {

    let baseUrl = this.httpRequestDataService.getApplicationUrl();
    console.log('getBaseUrl::: ' + baseUrl);

    if (isPlatformBrowser(this.platformId)) {
      const location = this.document.location;
      baseUrl = `${location.protocol}//${location.hostname}${location.port === "80" ? "" : ":" + location.port}`;
    } else if (isPlatformServer(this.platformId)) {
      console.log(this.request);
      baseUrl = `${this.request.protocol}://${this.request.header("x-forwarded-host")}`;
    }
    console.log('baseUrl::'+baseUrl);
    return baseUrl;
  }

  private onPositionError() {
    // default location is New York, NY
  }

  private onPositionSuccess(position: GeolocationPosition) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude
  }

  private detectCurrentPosition() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition(this.onPositionSuccess, this.onPositionError);
    }
  }

  private getTimeOfDay() {
    const position = this.detectCurrentPosition();
    const sunrise = getSunrise(latitude, longitude);
    const sunset = getSunset(latitude, longitude);
    const now = new Date();
    if (now >= sunrise && now < sunset) return 'day-time';
    return 'night-time'
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

  private setThemeMode(theme: ITheme | undefined, mode: IThemeMode | undefined) {
    const baseUrl = this.getBaseUrl();
    this.loadStylesheet('app-styles', baseUrl, `styles.css`, true, true);
    this.loadStylesheet('app-theme', baseUrl, `${mode?.file_name}`, true, true);
    const themeHighlightJS = `stackoverflow-${mode?.is_dark ? 'dark' : 'light'}.css`;
    this.loadStylesheet('app-theme-highlight-js', baseUrl, `/assets/highlight.js/styles/${themeHighlightJS}`, true, true);
    if (mode) {
      this.themeBS.next(mode);
    }
  }

  private getTheme(config: ITenantConfig, defaultName: string): ITheme {
    // todo: bootstrap logic is needed to determine default
    return config.themes.filter(theme => theme.name === defaultName)[0];
  }

  private getDefaultThemeName(): string {
    return 'default';
  }

  private getThemeMode(theme: ITheme, defaultName: string): IThemeMode {
    return theme.modes.filter(mode => mode.name === defaultName)[0];
  }

  private getDefaultThemeModeName(): string {
    return this.getTimeOfDay();
  }

  private getFullApplicationUrl(resource: string){
    return this.httpRequestDataService.getApplicationUrl() + resource;
  }
}
