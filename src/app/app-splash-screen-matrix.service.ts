import {Inject, Injectable, NgZone, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {debounceTime, filter, take} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class AppSplashScreenMatrixService {

  // @ts-ignore
  canvas: HTMLCanvasElement;
  // @ts-ignore
  private ctx: CanvasRenderingContext2D;
  private refreshIntervalId: any;
  // @ts-ignore
  private player: AnimationPlayer;

  constructor(private ngZone: NgZone,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              @Inject(PLATFORM_ID) private platformId: Object,
              private animationBuilder: AnimationBuilder
  ) {
  }

  init() {
    if (isPlatformBrowser(this.platformId)) {

      // @ts-ignore
      this.canvas = this.document.body.getElementsByClassName("splash").item(0);

      // @ts-ignore
      this.ctx = this.canvas.getContext('2d');

      if (this.canvas && this.ctx) {
        console.log('start playing splash screen');
        this.start();
        console.log('start listening for load complete and minimum elapsedTime');
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd),
          debounceTime(6500),
          take(1),
        ).subscribe(() => {
          console.log('stop playing splash screen');
          this.stop();
        });
      }

    }
    return Promise.resolve(undefined);
  }

  start() {
    // needed to avoid change detection on every change to screen
    this.ngZone.runOutsideAngular(() => {
      this.disableScroll();
      this.playSound();
      this.playAnimation();
    });
  }

  private disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.scrollX || document.documentElement.scrollTop;
    let scrollLeft = window.scrollY || document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  private enableScroll() {
    window.onscroll = function () {
    };
  }

  private playSound() {
    let audio: HTMLAudioElement = new Audio();
    audio.src = '/assets/audio/dial-up-modem-alt2.mp3';
    audio.load();
    audio.play().catch(reason => console.log('ERROR: Audio did not play'));
  }

  private playAnimation(): any {
    // Get the canvas node and the drawing context
    const ctx = this.ctx;
    const canvas = this.canvas;

    // set the width and height of the canvas
    const w = (canvas.width = document.body.offsetWidth);
    const h = (canvas.height = document.body.offsetHeight); //document.body.offsetHeight);
    // draw a black rectangle of width and height same as that of the canvas
    //  this.ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    const cols = Math.floor(w / 20) + 1;
    const ypos = Array(cols).fill(0);

    function matrix() {
      // Draw a semitransparent black rectangle on top of previous drawing
      ctx.fillStyle = '#0001';
      ctx.fillRect(0, 0, w, h);

      // Set color to green and font to 15pt monospace in the drawing context
      ctx.fillStyle = '#0f0';
      ctx.font = '15pt monospace';

      // for each column put a random character at the end
      ypos.forEach((y, ind) => {
        // generate a random character
        const text = String.fromCharCode(Math.random() * 128);

        // x coordinate of the column, y coordinate is already given
        const x = ind * 20;
        // render the character at (x, y)
        ctx.fillText(text, x, y);

        // randomly reset the end of the column if it's at least 100px high
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        // otherwise, just move the y coordinate for the column 20px down,
        else ypos[ind] = y + 20;
      });
    }

    // render the animation at 20 FPS.
    this.refreshIntervalId = setInterval(matrix, 50);
  }

  stop() {
    this.enableScroll();
    clearInterval(this.refreshIntervalId);
    const factory = this.animationBuilder.build(this.getFadeOutAnimation());
    this.player = factory.create(this.canvas);
    // todo: should listen to event denoting when sound ends
    this.player.play();
    this.player.onDone(() => {
      this.canvas.remove();
      this.player.destroy();
    });
     //
  }

  private getFadeOutAnimation(): AnimationMetadata[] {
    return [style({ opacity: 1, transform: 'translateX(0)' }), animate('200ms', style({ opacity: 0, transform: 'translateX(0)' }))];
  }

}
