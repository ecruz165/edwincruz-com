import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {debounceTime, delay, filter, take, tap} from 'rxjs/operators';
import { animate, AnimationBuilder, style } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  splashScreenElem!: HTMLElement;

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private animationBuilder: AnimationBuilder,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }
  Init() {
    if (isPlatformBrowser(this.platformId)) {
      // @ts-ignore
      this.splashScreenElem = this.document.body.querySelector('#fury-splash-screen');

      if (this.splashScreenElem) {
        this.playSound();
        this.router.events.pipe(
          delay(15000),
          filter(event => event instanceof NavigationEnd),
          take(1),
        ).subscribe(() => {
          console.log('stop playing splash screen');
          this.hide();
        });
      }
    }
    return Promise.resolve(undefined);
  }
  playSound(){
    let audio:HTMLAudioElement = new Audio();
    audio.src='/assets/audio/dial-up-modem.mp3';
    audio.load();
    audio.play();
  }

  hide() {
    const player = this.animationBuilder.build([
      style({
        opacity: 1
      }),
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
        opacity: 0
      })),
    ]).create(this.splashScreenElem);
    player.onDone(() => this.splashScreenElem.remove());
    player.play();
  }


}
