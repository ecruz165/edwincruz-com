import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, OnDestroy, Renderer2, RendererFactory2,} from '@angular/core';
import {filter, interval, Observable, of, switchMap, throttle} from 'rxjs';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {ScrollInfo} from '../model/intent-event.interface';
import {tap} from "rxjs/operators";

// https://dmitripavlutin.com/react-throttle-debounce/
@Injectable({
  providedIn: 'root',
})
export class ScrollELService implements OnDestroy {
  scrollX: number|undefined = 0;
  scrollY: number|undefined = 0;
  timestamp: number = new Date().getTime();
  scrollXChange: number|undefined = 0;
  scrollYChange: number|undefined = 0;
  scrollHeight: number = 0;
  scrollWidth: number = 0;
  timeElapsed: number = 0;

  private renderer: Renderer2;
  private onScrollListener: () => void;

  private eventBS: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public event$: Observable<ScrollInfo> = this.eventBS
    .asObservable()
    .pipe(
      throttle(val => interval(200)),
      filter((val) => !!val),
      tap((val) => {
        // @ts-ignore
        this.scrollXChange = this?.document?.defaultView?.scrollX - this?.scrollX;
        // @ts-ignore
        this.scrollYChange = this?.document?.defaultView?.scrollY - this?.scrollY;
        this.scrollX = this.document.defaultView?.scrollX;
        this.scrollY = this.document.defaultView?.scrollY;
        this.scrollHeight= this.document.body.scrollHeight;
        this.scrollWidth= this.document.body.scrollWidth;
        const curTimestamp = new Date().getTime();
        this.timeElapsed = curTimestamp - this.timestamp;
        this.timestamp = curTimestamp;
      }),
      switchMap(val => of(this.getEvent())),
      tap(pos => console.log(pos))
    );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.onScrollListener = this.renderer.listen(
      'document',
      'scroll',
      (event) => {
        // @ts-ignore
        this.onUpdate(this.document, event);
      }
    );
  }

  onUpdate(event: any) {
    this.eventBS.next(event);
    return event;
  }

  getEvent(): ScrollInfo {
    return {
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      timestamp: this.timestamp,
      scrollXChange: this.scrollXChange,
      scrollYChange: this.scrollYChange,
      scrollHeight: this.scrollHeight,
      scrollWidth: this.scrollWidth,
      timeElapsed: this.timeElapsed,
    };
  }

  ngOnDestroy() {
    this.onScrollListener();
  }

}
