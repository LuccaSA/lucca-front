import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuPopoverComponent } from './popover.component';

describe('LuPopoverComponent', () => {
  let component: LuPopoverComponent;
  let fixture: ComponentFixture<LuPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
