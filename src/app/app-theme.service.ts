import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {

  constructor(
    private window: Window,
    @Inject(DOCUMENT) private document: Document) {
  }

  getHostname(): string {
    return this.window.location.hostname;
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
