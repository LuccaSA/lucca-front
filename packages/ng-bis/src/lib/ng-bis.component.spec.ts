import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBisComponent } from './ng-bis.component';

describe('NgBisComponent', () => {
  let component: NgBisComponent;
  let fixture: ComponentFixture<NgBisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgBisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
