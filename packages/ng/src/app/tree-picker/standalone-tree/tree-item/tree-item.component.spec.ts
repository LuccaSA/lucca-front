import { async, TestBed } from '@angular/core/testing';

import { LuTreeItemComponent } from './tree-item.component';

describe('LuTreeItemComponent', () => {
	beforeEach(async () => TestBed.configureTestingModule({
		providers: [],
		imports: []
	}).compileComponents());

	it('should create', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuTreeItemComponent]
		});
		const fixture = TestBed.createComponent(LuTreeItemComponent);
		const treeItemComponent = fixture.componentInstance;

		// Act
		fixture.detectChanges();

		expect(treeItemComponent).toBeTruthy();
	});
});
