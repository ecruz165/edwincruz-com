import {Inject, Injectable, Injector, Optional, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {environment} from "../../environments/environment";

//https://medium.com/@cyrilletuzi/angular-server-side-rendering-in-node-with-express-universal-engine-dce21933ddce
@Injectable({
  providedIn: 'root'
})
export class HttpRequestDataService {

  constructor(
    private injector: Injector,
    @Optional() @Inject(REQUEST) private request: Request,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  /**
   * http://localhost:4200
   */
  public getApplicationUrl(): string {
    if (environment.production) {
      return 'https://edwincruz.com';
    }
    let url = '';
    if (isPlatformServer(this.platformId)) {
      try {
        const request = this.injector.get(REQUEST);
        url = request.protocol + '://' + request.get('host');
      } catch (error) {
        // try catch needed for prerender to works
        url = 'http://localhost:4200';
      }
    } else if (isPlatformBrowser(this.platformId)) {
      const location = window.location;
      url = location.protocol + '//' + location.host;
    }
    return url;
  }

  /**
   * localhost:4200
   */
  public getApplicationHost(): string {
    let host: string | undefined = '';
    if (isPlatformServer(this.platformId)) {
      const request = this.injector.get(REQUEST);
      if (request.get('host') !== undefined) {
        host = request.get('host');
      }
    } else if (isPlatformBrowser(this.platformId)) {
      const location = window.location;
      host = location.host;
    }
    return <string>host;
  }

  /**
   * localhost
   */
  public getApplicationHostname(): string {
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
}
