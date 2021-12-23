import {Inject, Injectable, Injector, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformBrowser, isPlatformServer} from "@angular/common";
import {REQUEST} from "@nguniversal/express-engine/tokens";

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {

  constructor(
    private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document) {
  }

  getHostname(): string {
    let hostname = '';
    if (isPlatformServer(this.platformId)) {
      const request = this.injector.get(REQUEST);
      hostname = request.hostname;
    } else if (isPlatformBrowser(this.platformId)) {
      const location = window.location;
      hostname = location.hostname;
    }
    return hostname;
  }

  determineSite(hostName: string) {
    // some logic to determine siteA or siteB based on hostname
    return 'dark';
  }

  loadStylesheet(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'app-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
    }
  }

  toggleLightAndDarkTheme() {

  }

  Init() {
    const hostname = this.getHostname();
    const site = this.determineSite(hostname);
    const href = `${site}-theme.css`;
    this.loadStylesheet(href);
    return Promise.resolve();
  }
}
