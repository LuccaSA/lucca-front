import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuTreePickerItemComponent } from './tree-picker-item.component';

describe('LuTreePickerItemComponent', () => {
	let component: LuTreePickerItemComponent;
	let fixture: ComponentFixture<LuTreePickerItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LuTreePickerItemComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LuTreePickerItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
