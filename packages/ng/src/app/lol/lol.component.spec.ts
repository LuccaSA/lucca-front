import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LolComponent } from './lol.component';

describe('LolComponent', () => {
  let component: LolComponent;
  let fixture: ComponentFixture<LolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
