import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuTreeItemComponent } from './tree-item.component';

describe('LuTreeItemComponent', () => {
	let component: LuTreeItemComponent;
	let fixture: ComponentFixture<LuTreeItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LuTreeItemComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LuTreeItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
