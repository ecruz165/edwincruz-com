import { Injectable, OnDestroy } from '@angular/core';
import { debounce, filter, interval, Observable, scan, timer } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {
  SizeInfo,
  IntentInfo,
  PositionInfo,
} from '../model/intent-event.interface';
import { WindowELService } from './window-events-listener.service';
import { MouseELService } from './mouse-events-listener.service';

@Injectable({
  providedIn: 'root',
})
export class IntentEventPublisherService implements OnDestroy {
  private mousePosition: PositionInfo | undefined;
  private windowSize: SizeInfo | undefined;
  position: number = 0;

  private eventBS: BehaviorSubject<IntentInfo> = new BehaviorSubject<any>(null);

  public event$: Observable<IntentInfo> = this.eventBS
    .asObservable()
    .pipe(filter((val) => !!val));

  constructor(
    private mouseListner: MouseELService,
    private windowListener: WindowELService
  ) {
    mouseListner.event$
      .pipe(debounce(() => timer(200)))
      .subscribe((next: PositionInfo) => this.onMouseUpdate(next));
    windowListener.event$.subscribe((next: SizeInfo) =>
      this.onWindowUpdate(next)
    );
  }

  onMouseUpdate(next: PositionInfo): void {
    this.mousePosition = next;
    this.position =
      this.windowSize !== undefined
        ? this.windowSize.width / 2 - this.mousePosition.posX < 0
          ? -1
          : 1
        : 0;
    this.eventBS.next(this.getLatestIntent());
  }

  onWindowUpdate(next: SizeInfo): void {
    this.windowSize = next;
    this.position =
      this.mousePosition !== undefined
        ? this.windowSize.width / 2 - this.mousePosition.posX < 0
          ? -1
          : 1
        : 0;
    this.eventBS.next(this.getLatestIntent());
  }

  getLatestIntent(): IntentInfo {
    return {
      mouseInfo: this.mousePosition,
      windowInfo: this.windowSize,
      position: this.position,
    };
  }

  ngOnDestroy(): void {

  }
}
