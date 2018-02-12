import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuDepartmentPickerItemComponent } from './department-picker-item.component';

describe('DepartmentPickerItemComponent', () => {
	let component: LuDepartmentPickerItemComponent;
	let fixture: ComponentFixture<LuDepartmentPickerItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LuDepartmentPickerItemComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LuDepartmentPickerItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
