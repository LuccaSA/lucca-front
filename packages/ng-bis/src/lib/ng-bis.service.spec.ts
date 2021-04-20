import { TestBed } from '@angular/core/testing';

import { NgBisService } from './ng-bis.service';

describe('NgBisService', () => {
  let service: NgBisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgBisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
