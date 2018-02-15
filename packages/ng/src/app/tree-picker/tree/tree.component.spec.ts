import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuTreeComponent } from './tree.component';

describe('LuTreePickerComponent', () => {
	let component: LuTreeComponent;
	let fixture: ComponentFixture<LuTreeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LuTreeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LuTreeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
