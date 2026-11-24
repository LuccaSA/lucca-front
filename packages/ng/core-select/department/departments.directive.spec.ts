import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TreeNode } from '@lucca-front/ng/core-select';
import { ILuDepartment } from '@lucca-front/ng/department';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LU_SELECT_MAGIC_PAGE_SIZE, MAGIC_DEBOUNCE_DURATION } from '../api/api.directive';
import { LuCoreSelectDepartmentsDirective } from './departments.directive';

const treeUrl = '/organization/structure/api/departments/tree';
const countUrl = '/organization/structure/api/departments';

const front: TreeNode<ILuDepartment> = { node: { id: 3, name: 'Front' } };
const engineering: TreeNode<ILuDepartment> = { node: { id: 2, name: 'Ingénierie' }, children: [front] };
const marketing: TreeNode<ILuDepartment> = { node: { id: 4, name: 'Marketing' } };
const board: TreeNode<ILuDepartment> = { node: { id: 1, name: 'Direction' }, children: [engineering, marketing] };
const tree = { children: [board] };
// As many roots as a page of options: a paged API would ask for the next page after this one
const wideTree = { children: Array.from({ length: LU_SELECT_MAGIC_PAGE_SIZE }, (_, i) => ({ node: { id: 10 + i, name: `Service ${i + 1}` } })) };

@Component({
	selector: 'lu-departments-default-host',
	imports: [LuSimpleSelectInputComponent, LuCoreSelectDepartmentsDirective],
	template: `<lu-simple-select departments />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {
	readonly simpleSelect = viewChild.required<LuSimpleSelectInputComponent<TreeNode<ILuDepartment>>>(LuSimpleSelectInputComponent);
}

@Component({
	selector: 'lu-departments-configured-host',
	imports: [LuSimpleSelectInputComponent, LuCoreSelectDepartmentsDirective],
	template: `<lu-simple-select departments [filters]="filters()" [operationIds]="operationIds()" [uniqueOperationIds]="uniqueOperationIds()" [appInstanceId]="appInstanceId()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfiguredHostComponent {
	readonly filters = signal<Record<string, string | number | boolean> | null>({ status: 'active' });
	readonly operationIds = signal<number[] | null>(null);
	readonly uniqueOperationIds = signal<number[] | null>(null);
	readonly appInstanceId = signal<number | null>(null);
	readonly simpleSelect = viewChild.required<LuSimpleSelectInputComponent<TreeNode<ILuDepartment>>>(LuSimpleSelectInputComponent);
	readonly departmentsDirective = viewChild.required<LuCoreSelectDepartmentsDirective>(LuCoreSelectDepartmentsDirective);
}

describe('LuCoreSelectDepartmentsDirective', () => {
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	function openPanel<T extends DefaultHostComponent | ConfiguredHostComponent>(fixture: ComponentFixture<T>): LuSimpleSelectInputComponent<TreeNode<ILuDepartment>> {
		fixture.detectChanges();
		const simpleSelect = fixture.componentInstance.simpleSelect();
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick();
		return simpleSelect;
	}

	describe('with its default inputs', () => {
		let fixture: ComponentFixture<DefaultHostComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(DefaultHostComponent);
		});

		it('should load the whole department tree when the panel opens', fakeAsync(() => {
			// Act
			const simpleSelect = openPanel(fixture);
			httpTestingController.expectOne(treeUrl).flush(tree);
			fixture.detectChanges();
			tick();

			// Assert
			expect(simpleSelect.dataSourceOptions()).toEqual([board]);
		}));

		it('should not request a next page, as the tree comes in a single response', fakeAsync(() => {
			// Arrange
			const simpleSelect = openPanel(fixture);
			httpTestingController.expectOne(treeUrl).flush(wideTree);
			fixture.detectChanges();
			tick();

			// Act
			simpleSelect.nextPage$.next();
			fixture.detectChanges();
			tick();

			// Assert: no request left for afterEach's verify()
			expect(simpleSelect.dataSourceOptions()).toEqual(wideTree.children);
		}));

		it('should filter the tree on the clue without sending it, keeping the ancestors of the matching departments', fakeAsync(() => {
			// Arrange
			const simpleSelect = openPanel(fixture);
			httpTestingController.expectOne(treeUrl).flush(tree);
			fixture.detectChanges();
			tick();

			// Act: the tree endpoint can't search, the clue isn't sent
			simpleSelect.clueChanged('FRONT');
			fixture.detectChanges();
			tick(MAGIC_DEBOUNCE_DURATION);
			fixture.detectChanges();
			httpTestingController.expectOne(treeUrl).flush(tree);
			fixture.detectChanges();
			tick();

			// Assert
			expect(simpleSelect.dataSourceOptions()).toEqual([{ ...board, children: [engineering] }]);
		}));
	});

	describe('with filters and a scope', () => {
		let fixture: ComponentFixture<ConfiguredHostComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(ConfiguredHostComponent);
		});

		it('should send the filters with the tree request', fakeAsync(() => {
			// Act
			openPanel(fixture);

			// Assert
			httpTestingController.expectOne(`${treeUrl}?status=active`);
		}));

		it('should send the unique operations with the tree request', fakeAsync(() => {
			// Arrange
			fixture.componentInstance.uniqueOperationIds.set([1, 2]);

			// Act
			openPanel(fixture);

			// Assert
			httpTestingController.expectOne(`${treeUrl}?status=active&uniqueOperations=1,2`);
		}));

		it('should send the deprecated operations and app instance with the tree request', fakeAsync(() => {
			// Arrange
			fixture.componentInstance.operationIds.set([3]);
			fixture.componentInstance.appInstanceId.set(4);

			// Act
			openPanel(fixture);

			// Assert
			httpTestingController.expectOne(`${treeUrl}?status=active&operations=3&appInstanceId=4`);
		}));

		it('should count the departments with the filters, without loading them', fakeAsync(() => {
			// Arrange
			fixture.detectChanges();
			let totalCount: number | undefined;

			// Act
			fixture.componentInstance.departmentsDirective().totalCount$.subscribe((count) => (totalCount = count));
			tick(MAGIC_DEBOUNCE_DURATION);
			httpTestingController.expectOne(`${countUrl}?status=active&limit=0&fields.root=count`).flush({ count: 12 });

			// Assert
			expect(totalCount).toBe(12);
		}));
	});
});
