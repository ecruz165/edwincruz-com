import { Injectable, NgZone, OnDestroy } from '@angular/core';
import {filter, interval, Observable, throttle} from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SizeInfo } from '../model/intent-event.interface';
import { ViewportRuler } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class WindowELService implements OnDestroy {
  width: number = 0;
  height: number = 0;

  private viewportChange;

  private eventBS: BehaviorSubject<SizeInfo> = new BehaviorSubject<any>(null);

  public event$: Observable<SizeInfo> = this.eventBS
    .asObservable()
    .pipe(
      throttle(val => interval(200)),
      filter((val) => !!val));

  constructor(
    private readonly viewportRuler: ViewportRuler,
    private readonly ngZone: NgZone
  ) {
    this.viewportChange = this.viewportRuler.change(200).subscribe(() => {
      this.ngZone.run(() => this.eventBS.next(this.getEvent()));
    });

    this.setEvent();
  }

  ngOnDestroy(): void {
    this.viewportChange.unsubscribe;
  }

  getEvent(): SizeInfo {
    return { width: this.width, height: this.height };
  }

  private setEvent() {
    const { width, height } = this.viewportRuler.getViewportSize();
    this.width = width;
    this.height = height;
  }
}
