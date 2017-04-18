import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BogusComponent } from './bogus.component';

describe('BogusComponent', () => {
  let component: BogusComponent;
  let fixture: ComponentFixture<BogusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BogusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BogusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
