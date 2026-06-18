import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ALuSelectInputComponent, TreeNode } from '@lucca-front/ng/core-select';
import { ILuDepartment } from '@lucca-front/ng/department';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { LuCoreSelectDepartmentsDirective } from './departments.directive';

const treeMock: TreeNode<ILuDepartment> = {
	node: { id: 0, name: 'root' },
	children: [
		{
			node: { id: 1, name: 'Lucca France' },
			children: [
				{ node: { id: 11, name: 'Tech' }, children: [] },
				{ node: { id: 12, name: 'Admin' }, children: [] },
			],
		},
		{ node: { id: 2, name: 'Lucca UK' }, children: [{ node: { id: 21, name: 'Support' }, children: [] }] },
	],
};

describe('LuCoreSelectDepartmentsDirective', () => {
	let directive: LuCoreSelectDepartmentsDirective<ILuDepartment>;
	let selectMock: ALuSelectInputComponent<TreeNode<ILuDepartment>, unknown>;
	let httpTestingController: HttpTestingController;

	const url = '/organization/structure/api/departments/tree';

	beforeEach(() => {
		selectMock = {
			isPanelOpen$: new BehaviorSubject(false),
			nextPage$: new Subject<void>(),
			clueChange$: new Subject<string>(),
			options$: new ReplaySubject(1),
			loading$: new BehaviorSubject(false),
		} as ALuSelectInputComponent<TreeNode<ILuDepartment>, unknown>;

		TestBed.configureTestingModule({
			providers: [
				LuCoreSelectDepartmentsDirective,
				{
					provide: ALuSelectInputComponent,
					useValue: selectMock,
				},
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		});

		directive = TestBed.inject<LuCoreSelectDepartmentsDirective<ILuDepartment>>(LuCoreSelectDepartmentsDirective);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should emit the flattened total count without opening the panel', fakeAsync(() => {
		let emittedCount: number | undefined;
		directive.totalCount$.subscribe((count) => (emittedCount = count));

		TestBed.flushEffects();
		tick();
		httpTestingController.expectOne(url).flush(treeMock);

		expect(emittedCount).toBe(5);

		httpTestingController.verify();
	}));
});
