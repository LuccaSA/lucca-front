import { OverlayContainer } from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SelectDataSource, TreeNode } from '@lucca-front/ng/core-select';
import { ILuDepartment } from '@lucca-front/ng/department';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuCoreSelectDepartmentsDirective } from './departments.directive';
import { provideCoreSelectCurrentDepartmentId } from './my-department.provider';

const treeUrl = '/organization/structure/api/departments/tree';

const tree: TreeNode<ILuDepartment>[] = [
	{
		node: { id: 1, name: 'Root' },
		children: [{ node: { id: 2, name: 'Child' }, children: [{ node: { id: 3, name: 'Grandchild' }, children: [] }] }],
	},
	{ node: { id: 4, name: 'Other root' }, children: [] },
];

@Component({
	selector: 'lu-departments-directive-host',
	imports: [LuSimpleSelectInputComponent, LuCoreSelectDepartmentsDirective],
	template: `<lu-simple-select departments [displayMyDepartmentOption]="displayMyDepartmentOption()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuDepartmentsDirectiveHostComponent {
	readonly displayMyDepartmentOption = signal(false);
	readonly select = viewChild.required<LuSimpleSelectInputComponent<TreeNode<ILuDepartment>>>(LuSimpleSelectInputComponent);
	readonly departmentsDirective = viewChild.required(LuCoreSelectDepartmentsDirective);
}

function setup(currentDepartmentId: number | null) {
	TestBed.configureTestingModule({
		imports: [LuDepartmentsDirectiveHostComponent],
		providers: [provideHttpClient(), provideHttpClientTesting(), ...(currentDepartmentId === null ? [] : [provideCoreSelectCurrentDepartmentId(() => currentDepartmentId)])],
	});
	const httpTestingController = TestBed.inject(HttpTestingController);
	const fixture: ComponentFixture<LuDepartmentsDirectiveHostComponent> = TestBed.createComponent(LuDepartmentsDirectiveHostComponent);
	const host = fixture.componentInstance;
	fixture.detectChanges();

	/** Loads the options for the clue and answers the tree call with the whole tree, as the API does. */
	function loadOptions(clue = ''): readonly TreeNode<ILuDepartment>[] {
		let options: readonly TreeNode<ILuDepartment>[] = [];
		const dataSource = host.select().dataSource() as SelectDataSource<TreeNode<ILuDepartment>, unknown>;
		dataSource.getOptions({ clue, page: 0 }).subscribe((page) => (options = page));
		httpTestingController.expectOne((req) => req.url === treeUrl).flush({ children: tree });
		tick();
		return options;
	}

	function displayMyDepartmentOption() {
		host.displayMyDepartmentOption.set(true);
		fixture.detectChanges();
	}

	return { httpTestingController, host, loadOptions, displayMyDepartmentOption };
}

describe(LuCoreSelectDepartmentsDirective.name, () => {
	let ctx: ReturnType<typeof setup>;

	beforeEach(() => {
		ctx = setup(2);
	});

	afterEach(() => {
		ctx.httpTestingController.verify();
	});

	it('should not display my department unless `displayMyDepartmentOption` is set', fakeAsync(() => {
		const options = ctx.loadOptions();

		expect(options.map(({ node }) => node.id)).toEqual([1, 4]);
	}));

	describe('displayMyDepartmentOption', () => {
		beforeEach(() => {
			ctx.displayMyDepartmentOption();
		});

		it('should display my department first, collapsed on its sub-departments, and keep it at its place in the tree', fakeAsync(() => {
			const [myDepartment, ...treeOptions] = ctx.loadOptions();

			expect(myDepartment.node).toEqual({ id: 2, name: 'Child' });
			expect(myDepartment.children).toEqual([{ node: { id: 3, name: 'Grandchild' }, children: [] }]);
			expect(myDepartment.ɵcollapsed).toBe(true);
			expect(treeOptions).toEqual(tree);
		}));

		it('should tell my department apart from the same department in the tree', fakeAsync(() => {
			const [myDepartment, root] = ctx.loadOptions();
			const treeDepartment = root.children![0].node;
			const directive = ctx.host.departmentsDirective();

			expect(directive.isMyDepartmentOption(myDepartment.node)).toBe(true);
			expect(directive.isMyDepartmentOption(treeDepartment)).toBe(false);
		}));

		it('should track my department apart from the same department in the tree, but select both', fakeAsync(() => {
			const [myDepartment, root] = ctx.loadOptions();
			const treeDepartment = root.children![0].node;
			const optionKey = ctx.host.select().optionKey() as (option: unknown) => unknown;
			const optionComparer = ctx.host.select().optionComparer() as (a: unknown, b: unknown) => boolean;

			expect(optionKey(myDepartment.node)).not.toBe(optionKey(treeDepartment));
			expect(optionComparer(myDepartment.node, treeDepartment)).toBe(true);
			expect(optionComparer(myDepartment.node, root.node)).toBe(false);
		}));

		it('should not display my department while searching', fakeAsync(() => {
			const options = ctx.loadOptions('Child');

			expect(options.map(({ node }) => node.id)).toEqual([1]);
			expect(ctx.host.departmentsDirective().isMyDepartmentOption(options[0].children![0].node)).toBe(false);
		}));
	});
});

describe(`${LuCoreSelectDepartmentsDirective.name} with a root department as my department`, () => {
	it('should give my department a key of its own', fakeAsync(() => {
		const ctx = setup(1);
		ctx.displayMyDepartmentOption();

		const options = ctx.loadOptions();
		const optionKey = ctx.host.select().optionKey() as (option: unknown) => unknown;

		expect(options.map(({ node }) => node.id)).toEqual([1, 1, 4]);
		const keys = options.map(({ node }) => optionKey(node));
		expect(new Set(keys).size).toBe(keys.length);
		ctx.httpTestingController.verify();
	}));
});

describe(`${LuCoreSelectDepartmentsDirective.name} without current department`, () => {
	it('should not display "My department" when the app does not provide it', fakeAsync(() => {
		const ctx = setup(null);
		ctx.displayMyDepartmentOption();

		const options = ctx.loadOptions();

		expect(options.map(({ node }) => node.id)).toEqual([1, 4]);
		ctx.httpTestingController.verify();
	}));
});

describe(`${LuCoreSelectDepartmentsDirective.name} with a department out of the restrictions`, () => {
	it('should not display "My department" when it is not in the tree', fakeAsync(() => {
		const ctx = setup(42);
		ctx.displayMyDepartmentOption();

		const options = ctx.loadOptions();

		expect(options.map(({ node }) => node.id)).toEqual([1, 4]);
		ctx.httpTestingController.verify();
	}));
});

@Component({
	selector: 'lu-departments-multi-select-host',
	imports: [LuMultiSelectInputComponent, LuCoreSelectDepartmentsDirective],
	template: `<lu-multi-select departments displayMyDepartmentOption />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuDepartmentsMultiSelectHostComponent {
	readonly select = viewChild.required<LuMultiSelectInputComponent<ILuDepartment>>(LuMultiSelectInputComponent);
}

describe(`${LuCoreSelectDepartmentsDirective.name} in a multi-select`, () => {
	let httpTestingController: HttpTestingController;
	let overlayContainerElement: HTMLElement;
	let emittedValues: (ILuDepartment[] | null)[];

	/** Opens the panel, whose first option is "My department" (Child), collapsed on its sub-department (Grandchild). */
	function openPanel(): HTMLElement {
		TestBed.configureTestingModule({
			imports: [LuDepartmentsMultiSelectHostComponent],
			providers: [provideHttpClient(), provideHttpClientTesting(), provideCoreSelectCurrentDepartmentId(() => 2)],
		});
		httpTestingController = TestBed.inject(HttpTestingController);
		overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
		const fixture = TestBed.createComponent(LuDepartmentsMultiSelectHostComponent);
		fixture.detectChanges();
		const select = fixture.componentInstance.select();
		emittedValues = [];
		select.registerOnChange((value) => emittedValues.push(value));

		select.openPanel();
		fixture.detectChanges();
		tick(20);
		httpTestingController.expectOne((req) => req.url === treeUrl).flush({ children: tree });
		tick();
		fixture.detectChanges();

		return overlayContainerElement.querySelector<HTMLElement>('lu-select-option')!;
	}

	function lastEmittedIds(): number[] {
		return (emittedValues.at(-1) ?? []).map(({ id }) => id);
	}

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should display my department without its sub-departments, with the actions of a parent department', fakeAsync(() => {
		const myDepartment = openPanel();

		expect(myDepartment.textContent).toContain('My department:');
		expect(myDepartment.querySelector('lu-tree-branch')).toBeNull();
		expect(myDepartment.querySelector('.parentOnly')).toBeTruthy();
		expect(myDepartment.querySelector('.childrenOnly')).toBeTruthy();
	}));

	it('should select my department and its sub-departments on click', fakeAsync(() => {
		openPanel().click();

		expect(lastEmittedIds()).toEqual([2, 3]);
	}));

	it('should select only my department', fakeAsync(() => {
		openPanel().querySelector<HTMLElement>('.parentOnly')!.click();

		expect(lastEmittedIds()).toEqual([2]);
	}));

	it('should select only the sub-departments of my department', fakeAsync(() => {
		openPanel().querySelector<HTMLElement>('.childrenOnly')!.click();

		expect(lastEmittedIds()).toEqual([3]);
	}));
});
