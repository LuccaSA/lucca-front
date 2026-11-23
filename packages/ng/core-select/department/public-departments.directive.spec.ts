import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, SelectDataSource, TreeNode } from '@lucca-front/ng/core-select';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LuCoreSelectPublicDepartment, LuCoreSelectPublicDepartmentsDirective } from './public-departments.directive';

@Component({
	selector: 'lu-simple-select',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockSelectComponent {}

@Component({
	template: `<lu-simple-select publicDepartments />`,
	imports: [MockSelectComponent, LuCoreSelectPublicDepartmentsDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

const departments: LuCoreSelectPublicDepartment[] = [
	{ id: '1', name: 'Production', parent: null, sortOrder: 1 },
	{ id: '2', name: 'Administration', parent: null, sortOrder: 0 },
	{ id: '3', name: 'Comptabilité', parent: { id: '2' }, sortOrder: 0 },
	{ id: '4', name: 'Orphan', parent: { id: '99' }, sortOrder: 2 },
];

function toNames(branches: readonly TreeNode<LuCoreSelectPublicDepartment>[]): unknown[] {
	return branches.map(({ node, children }) => (children?.length ? { [node.name]: toNames(children) } : node.name));
}

describe(LuCoreSelectPublicDepartmentsDirective.name, () => {
	let dataSource: SelectDataSource<TreeNode<LuCoreSelectPublicDepartment>> | undefined;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [
				{
					provide: ALuSelectInputComponent,
					useValue: {
						isPanelOpen$: new BehaviorSubject(false),
						nextPage$: new Subject<void>(),
						clueChange$: new Subject<string>(),
						optionComparer: coreSelectDefaultOptionComparer,
						optionKey: coreSelectDefaultOptionKey,
						dataSource: { set: (ds: SelectDataSource<TreeNode<LuCoreSelectPublicDepartment>>) => (dataSource = ds) },
						loading: { set: () => {} },
					},
				},
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		});
		TestBed.createComponent(HostComponent).detectChanges();
		httpTesting = TestBed.inject(HttpTestingController);
	});

	it('should build the tree of every non archived department, ordered by sort order', fakeAsync(async () => {
		// Act
		const options = firstValueFrom(dataSource!.getOptions({ clue: '', page: 0 }));
		const req = httpTesting.expectOne('/lucca-api/departments?isArchived=false&limit=100&include=links');
		req.flush({ items: departments, links: { next: null } });

		// Assert
		expect(toNames(await options)).toEqual([{ Administration: ['Comptabilité'] }, 'Production', 'Orphan']);
		expect(req.request.headers.get('Api-Version')).toBe('2024-11-01');
	}));

	it('should keep the ancestors of the departments matching the clue without fetching again', fakeAsync(async () => {
		// Arrange
		const options = firstValueFrom(dataSource!.getOptions({ clue: '', page: 0 }));
		httpTesting.expectOne('/lucca-api/departments?isArchived=false&limit=100&include=links').flush({ items: departments, links: { next: null } });
		await options;

		// Act
		const searched = await firstValueFrom(dataSource!.getOptions({ clue: 'compta', page: 0 }));

		// Assert
		expect(toNames(searched)).toEqual([{ Administration: ['Comptabilité'] }]);
		httpTesting.verify();
	}));
});
