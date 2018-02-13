import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuTreePickerComponent } from './tree-picker.component';

describe('LuTreePickerComponent', () => {
	let component: LuTreePickerComponent;
	let fixture: ComponentFixture<LuTreePickerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LuTreePickerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LuTreePickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
