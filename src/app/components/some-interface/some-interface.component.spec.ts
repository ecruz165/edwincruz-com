import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeInterfaceComponent } from './some-interface.component';

describe('SomeInterfaceComponent', () => {
  let component: SomeInterfaceComponent;
  let fixture: ComponentFixture<SomeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomeInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
