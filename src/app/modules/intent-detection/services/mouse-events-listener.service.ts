import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, OnDestroy, Renderer2, RendererFactory2,} from '@angular/core';
import {filter, interval, Observable, of, switchMap, throttle} from 'rxjs';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {PositionInfo} from '../model/intent-event.interface';
import {tap} from "rxjs/operators";

// https://dmitripavlutin.com/react-throttle-debounce/
@Injectable({
  providedIn: 'root',
})
export class MouseELService implements OnDestroy {
  posX: number = 0;
  posY: number = 0;
  timestamp: number = 0;
  posXChange: number = 0;
  posYChange: number = 0;
  timeElapsed: number = 0;

  private renderer: Renderer2;
  private onMouseMoveListener: () => void;


  private eventBS: BehaviorSubject<MouseEvent> = new BehaviorSubject<any>(null);
  public event$: Observable<PositionInfo> = this.eventBS
    .asObservable()
    .pipe(
      throttle(val => interval(200)),
      filter((val) => !!val),
      filter((current) => Math.abs(current.pageX - this.posX) > 8 || Math.abs(current.pageY - this.posY) > 8),
      tap((val) => {
        this.posXChange = val.pageX - this.posX;
        this.posYChange =  val.pageY - this.posY;
        this.posX = val.pageX;
        this.posY = val.pageY;


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

    this.onMouseMoveListener = this.renderer.listen(
      'document',
      'mousemove',
      (event) => {
        this.onUpdate(event)
      }
    );

  }

  onUpdate(event: any) {
    this.eventBS.next(event);
    return event;
  }

  getEvent(): PositionInfo {
    return {
      posX: this.posX,
      posY: this.posY,
      timestamp: this.timestamp,
      posXChange: this.posXChange,
      posYChange: this.posYChange,
      timeElapsed: this.timeElapsed,
    };
  }

  ngOnDestroy() {
    this.onMouseMoveListener();
  }

}
