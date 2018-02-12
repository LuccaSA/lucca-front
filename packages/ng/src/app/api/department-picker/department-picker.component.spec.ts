import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuDepartmentPickerComponent } from './department-picker.component';

describe('DepartmentPickerComponent', () => {
	let component: LuDepartmentPickerComponent;
	let fixture: ComponentFixture<LuDepartmentPickerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LuDepartmentPickerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LuDepartmentPickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
