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
  scrollX: number = 0;
  scrollY: number = 0;
  timestamp: number = new Date().getTime();
  scrollXChange: number = 0;
  scrollYChange: number = 0;
  scrollHeight: number = 0;
  scrollWidth: number = 0;
  timeElapsed: number = 0;

  private renderer: Renderer2;
  private onScrollListener: () => void;

  private eventBS: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public event$: Observable<ScrollInfo> = this.eventBS
    .asObservable()
    .pipe(
      throttle(val => interval(100)),
      filter((val) => !!val),
      tap((val) => {
        const _document = this.document;
        const _window = _document.defaultView
        if (_window !== null) {
          this.scrollXChange = _window.scrollX - this.scrollX;
          this.scrollYChange = _window.scrollY - this.scrollY;
          this.scrollX = _window.scrollX;
          this.scrollY = _window.scrollY;
        }
        this.scrollHeight = _document.body.scrollHeight;
        this.scrollWidth = _document.body.scrollWidth;
        const curTimestamp = new Date().getTime();
        this.timeElapsed = curTimestamp - this.timestamp;
        this.timestamp = curTimestamp;
      }),
      switchMap(val => of(this.getEvent()))
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
