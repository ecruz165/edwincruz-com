import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHistoryCarouselComponent } from './work-history-carousel.component';

describe('WorkHistoryCarouselComponent', () => {
  let component: WorkHistoryCarouselComponent;
  let fixture: ComponentFixture<WorkHistoryCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkHistoryCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkHistoryCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
