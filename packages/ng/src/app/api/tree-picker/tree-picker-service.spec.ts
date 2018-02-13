import { TestBed, inject } from '@angular/core/testing';

import { DepartmentPickerService } from './tree-picker.class';

describe('DepartmentPickerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DepartmentPickerService]
		});
	});

	it('should be created', inject([DepartmentPickerService], (service: DepartmentPickerService) => {
		expect(service).toBeTruthy();
	}));
});
