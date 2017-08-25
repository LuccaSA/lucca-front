import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRangePickerComponent } from './custom-range-picker.component';

describe('CustomRangePickerComponent', () => {
  let component: CustomRangePickerComponent;
  let fixture: ComponentFixture<CustomRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRangePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
