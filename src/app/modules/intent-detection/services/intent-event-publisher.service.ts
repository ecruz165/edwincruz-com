import {Injectable, OnDestroy} from '@angular/core';
import {filter, Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {GestureDirection, IntentInfo, MouseInfo, ScrollInfo, SizeInfo,} from '../model/intent-event.interface';
import {WindowELService} from './window-events-listener.service';
import {MouseELService} from './mouse-events-listener.service';
import {ScrollELService} from "./scroll-events-listener.service";

@Injectable({
  providedIn: 'root',
})
export class IntentEventPublisherService implements OnDestroy {

  private mouseInfo: MouseInfo = {
    posX: 0,
    posY: 0,
    timestamp: 0,
    posXChange: 0,
    posYChange: 0,
    timeElapsed: 0
  };

  private windowSize: SizeInfo = {
    width: 0,
    height: 0
  };

  private scrollInfo: ScrollInfo = {
    scrollX: 0,
    scrollY: 0,
    timestamp: 0,
    scrollXChange: 0,
    scrollYChange: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    timeElapsed: 0
  };

  alignmentX: number = 0;
  direction: GestureDirection=0;

  private eventBS: BehaviorSubject<IntentInfo> = new BehaviorSubject<any>(null);

  public event$: Observable<IntentInfo> = this.eventBS
    .asObservable()
    .pipe(filter((val) => !!val));

  constructor(
    private mouseListener: MouseELService,
    private windowListener: WindowELService,
    private scrollListener: ScrollELService
  ) {
    mouseListener.event$
      .subscribe((next: MouseInfo) => this.onMouseUpdate(next));
    windowListener.event$.subscribe((next: SizeInfo) =>
      this.onWindowUpdate(next)
    );
    scrollListener.event$
      .subscribe((next: ScrollInfo) => this.onScrollUpdate(next));
  }

  onMouseUpdate(next: MouseInfo): void {
    this.mouseInfo = next;
    this.alignmentX = this.getPosition(this.scrollInfo, this.mouseInfo);
    this.direction = this.getDirection(this.mouseInfo.posXChange, this.mouseInfo.posYChange);
    this.eventBS.next(this.getLatestIntent());
  }

  onWindowUpdate(next: SizeInfo): void {
    this.windowSize = next;
    this.alignmentX = this.getPosition(this.scrollInfo, this.mouseInfo);
    this.eventBS.next(this.getLatestIntent());
  }

  onScrollUpdate(next: ScrollInfo): void {
    this.scrollInfo = next;
    this.mouseInfo.posX = this.mouseInfo.posX + next.scrollXChange;
    this.mouseInfo.posY = this.mouseInfo.posY + next.scrollYChange;
    this.mouseInfo.posXChange = next.scrollXChange;
    this.mouseInfo.posYChange = next.scrollYChange;
    this.alignmentX = this.getPosition(this.scrollInfo, this.mouseInfo);
    this.direction = this.getDirection(this.mouseInfo.posXChange, this.mouseInfo.posYChange);
    this.eventBS.next(this.getLatestIntent());
  }

  private getPosition(scrollInfo: ScrollInfo, mouseInfo: MouseInfo) {
    const halfscreen = this.scrollInfo.scrollWidth / 2;
    if (Math.abs(this.mouseInfo.posX-halfscreen ) < 32) {
      return 0;
    }
    return halfscreen > this.mouseInfo.posX ? -1 : 1;
  }

  private getDirection(posXChange: number, posYChange: number): GestureDirection {
    if (posYChange > 0) {
      if (posXChange == 0) {
        return GestureDirection.SOUTH
      } else {
        return posXChange > 0 ? GestureDirection.SOUTH_EAST : GestureDirection.SOUTH_WEST;
      }
    }
    if (posYChange < 0) {
      if (posXChange == 0) {
        return GestureDirection.NORTH
      } else {
        return posXChange > 0 ? GestureDirection.NORTH_EAST : GestureDirection.NORTH_WEST;
      }
    } else {
      if (posXChange == 0) {
        return GestureDirection.INSIDE;
      } else {
        return posXChange > 0 ? GestureDirection.EAST : GestureDirection.WEST;
      }
    }

  }

  getLatestIntent(): IntentInfo {
    return {
      mouseInfo: this.mouseInfo,
      windowInfo: this.windowSize,
      scrollInfo: this.scrollInfo,
      alignmentX: this.alignmentX,
      direction: this.direction,
    };
  }

  ngOnDestroy(): void {

  }
}
