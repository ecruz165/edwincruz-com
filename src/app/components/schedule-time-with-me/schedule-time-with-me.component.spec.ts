import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTimeWithMeComponent } from './schedule-time-with-me.component';

describe('ScheduleAZoomComponent', () => {
  let component: ScheduleTimeWithMeComponent;
  let fixture: ComponentFixture<ScheduleTimeWithMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleTimeWithMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTimeWithMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
