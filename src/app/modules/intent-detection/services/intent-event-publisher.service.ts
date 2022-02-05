import {Injectable, OnDestroy} from '@angular/core';
import {filter, Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {IntentInfo, PositionInfo, ScrollInfo, SizeInfo,} from '../model/intent-event.interface';
import {WindowELService} from './window-events-listener.service';
import {MouseELService} from './mouse-events-listener.service';
import {ScrollELService} from "./scroll-events-listener.service";

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
    private mouseListener: MouseELService,
    private windowListener: WindowELService,
    private scrollListener: ScrollELService
  ) {
    mouseListener.event$
      .subscribe((next: PositionInfo) => this.onMouseUpdate(next));
    windowListener.event$.subscribe((next: SizeInfo) =>
      this.onWindowUpdate(next)
    );
    scrollListener.event$
      .subscribe((next: ScrollInfo) => this.onScrollUpdate(next));
  }

  onMouseUpdate(next: PositionInfo): void {
    console.log('mouse update')
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

  onScrollUpdate(next: ScrollInfo): void {
    // @ts-ignore
    this?.mousePosition?.posX = this?.mousePosition?.posX + next.scrollXChange;
    // @ts-ignore
    this?.mousePosition?.posY = this?.mousePosition?.posY + next.scrollYChange;
    // @ts-ignore
    this?.mousePosition?.posXChange =  next.scrollXChange;
    // @ts-ignore
    this?.mousePosition?.posYChange =  next.scrollYChange;
    this.position =
      this.mousePosition !== undefined
        // @ts-ignore
        ? next.scrollWidth / 2 - this.mousePosition.posX < 0
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
