import { TestBed, inject } from '@angular/core/testing';

import { FormlyService } from './formly.service';

describe('FormlyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormlyService]
    });
  });

  it('should be created', inject([FormlyService], (service: FormlyService) => {
    expect(service).toBeTruthy();
  }));
});
