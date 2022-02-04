import { DOCUMENT } from '@angular/common';
import {
  Inject,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { filter, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PositionInfo } from '../model/intent-event.interface';

@Injectable({
  providedIn: 'root',
})
export class MouseELService implements OnDestroy {
  posX: number = 0;
  posY: number = 0;
  timestamp: number = 0;
  posXChange: number = 0;
  posYChange: number = 0;
  timeElaspsed: number = 0;
  private renderer: Renderer2;
  private onMouseMoveListener: () => void;
  private onScrollListener: () => void;

  private eventBS: BehaviorSubject<PositionInfo> = new BehaviorSubject<any>(
    null
  );
  public event$: Observable<PositionInfo> = this.eventBS
    .asObservable()
    .pipe(filter((val) => !!val));

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.onMouseMoveListener = this.renderer.listen(
      'document',
      'mousemove',
      (event) => {
        this.onUpdate(event.pageX, event.pageY);
      }
    );
    this.onScrollListener = this.renderer.listen(
      'document',
      'scroll',
      (event) => {
        this.onUpdate(event.pageX, event.pageY);
      }
    );
  }

  getEvent(): PositionInfo {
    return {
      posX: this.posX,
      posY: this.posY,
      timestamp: this.timestamp,
      posXChange: this.posXChange,
      posYChange: this.posYChange,
      timeElaspsed: this.timeElaspsed,
    };
  }

  onUpdate(curPosX: number, curPosY: number) {
    this.posXChange = this.posX - curPosX;
    this.posX = curPosX;
    this.posYChange = this.posY - curPosY;
    this.posY = curPosY;
    const curTimestamp = new Date().getTime();
    this.timeElaspsed = curTimestamp - this.timestamp;
    this.timestamp = curTimestamp;
    this.eventBS.next(this.getEvent());
  }

  ngOnDestroy() {
    this.onMouseMoveListener();
    this.onScrollListener();
  }
}
