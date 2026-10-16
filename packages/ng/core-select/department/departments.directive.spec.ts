import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { isNotNil } from '@lucca-front/ng/core';
import { ILuDepartment } from '@lucca-front/ng/department';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuCoreSelectDepartmentsDirective } from './departments.directive';

const departmentsTreeUrl = '/organization/structure/api/departments/tree';

@Component({
	selector: 'lu-departments-directive-host',
	imports: [LuMultiSelectInputComponent, LuCoreSelectDepartmentsDirective],
	template: `<lu-multi-select departments />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuDepartmentsDirectiveHostComponent {
	readonly multiSelect = viewChild.required<LuMultiSelectInputComponent<ILuDepartment>>(LuMultiSelectInputComponent);
}

describe(LuCoreSelectDepartmentsDirective.name, () => {
	let httpTestingController: HttpTestingController;
	let fixture: ComponentFixture<LuDepartmentsDirectiveHostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuDepartmentsDirectiveHostComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		fixture = TestBed.createComponent(LuDepartmentsDirectiveHostComponent);
		fixture.detectChanges();
	});

	it('should use department wording for the parent / children only actions', async () => {
		// Arrange
		const multiSelect = fixture.componentInstance.multiSelect();
		multiSelect.openPanel();
		await vi.waitUntil(() => isNotNil(multiSelect.panelRef));

		// Act
		await vi.waitUntil(() => {
			httpTestingController
				.match((req) => req.url === departmentsTreeUrl)
				.forEach((req) =>
					req.flush({
						children: [{ node: { id: 1, name: 'Parent' }, children: [{ node: { id: 2, name: 'Child' }, children: [] }] }],
					}),
				);
			fixture.detectChanges();
			return document.querySelector('.optionItem-icon.parentOnly');
		});

		// Assert
		expect(document.querySelector('.optionItem-icon.parentOnly .pr-u-mask')?.textContent).toBe('Only this department (Ctrl + Enter)');
		expect(document.querySelector('.optionItem-icon.childrenOnly .pr-u-mask')?.textContent).toBe('Only sub-departments (Shift + Enter)');
	});
});
