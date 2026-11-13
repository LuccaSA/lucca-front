import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, Provider, Type } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, SelectDataSource } from '@lucca-front/ng/core-select';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LuCoreSelectFormerEmployeesComponent } from './former-employees.component';
import { provideCoreSelectCurrentUserId } from './me.provider';
import { LuCoreSelectPublicEmployee, LuCoreSelectPublicEmployeesDirective } from './public-employees.directive';
import { LuCoreSelectWithAdditionnalInformation } from './user-option.model';

@Component({
	selector: 'lu-simple-select',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockSelectComponent {}

@Component({
	template: `<lu-simple-select publicEmployees />`,
	imports: [MockSelectComponent, LuCoreSelectPublicEmployeesDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

@Component({
	template: `<lu-simple-select publicEmployees enableFormerEmployees />`,
	imports: [MockSelectComponent, LuCoreSelectPublicEmployeesDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormerEmployeesHostComponent {}

type Option = LuCoreSelectWithAdditionnalInformation<LuCoreSelectPublicEmployee>;

function setup(providers: Provider[] = [], host: Type<unknown> = HostComponent) {
	let dataSource: SelectDataSource<Option, unknown> | undefined;
	let panelHeaderTpl: unknown;
	TestBed.configureTestingModule({
		imports: [host],
		providers: [
			{
				provide: ALuSelectInputComponent,
				useValue: {
					isPanelOpen$: new BehaviorSubject(false),
					nextPage$: new Subject<void>(),
					clueChange$: new Subject<string>(),
					clue$: new BehaviorSubject(''),
					optionComparer: coreSelectDefaultOptionComparer,
					optionKey: coreSelectDefaultOptionKey,
					optionTpl: { set: () => {} },
					valueTpl: { set: () => {} },
					panelHeaderTpl: { set: (tpl: unknown) => (panelHeaderTpl = tpl) },
					dataSource: { set: (ds: SelectDataSource<Option, unknown>) => (dataSource = ds) },
					loading: { set: () => {} },
				},
			},
			provideHttpClient(),
			provideHttpClientTesting(),
			...providers,
		],
	});
	const fixture = TestBed.createComponent(host);
	fixture.detectChanges();

	return {
		httpTesting: TestBed.inject(HttpTestingController),
		dataSource: () => dataSource!,
		directive: fixture.debugElement.query(By.directive(LuCoreSelectPublicEmployeesDirective)).injector.get(LuCoreSelectPublicEmployeesDirective),
		panelHeaderTpl: () => panelHeaderTpl,
	};
}

const employee = (id: string, givenName: string, familyName: string, jobPositionId?: string): LuCoreSelectPublicEmployee => ({
	id,
	givenName,
	familyName,
	...(jobPositionId ? { applicableJobPosition: { id: jobPositionId } } : {}),
});

describe(LuCoreSelectPublicEmployeesDirective.name, () => {
	it('should search the active employees sorted by family name', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource } = setup();

		// Act
		const options = firstValueFrom(dataSource().getOptions({ clue: 'bob', page: 0 }));
		const req = httpTesting.expectOne('/lucca-api/employees?status=active&sort=familyName&search=bob&limit=20&include=links,embedded');
		req.flush({ items: [employee('1', 'Bob', 'Martin')], links: { next: null } });

		// Assert
		expect(await options).toEqual([{ ...employee('1', 'Bob', 'Martin'), picture: null }]);
		expect(req.request.headers.get('Api-Version')).toBe('2024-11-01');
	}));

	it('should show the current employee first without a clue', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource } = setup([provideCoreSelectCurrentUserId(() => 2)]);

		// Act
		const options = firstValueFrom(dataSource().getOptions({ clue: '', page: 0 }));
		httpTesting.expectOne('/lucca-api/employees?id=2&limit=1&include=links,embedded').flush({ items: [employee('2', 'Alice', 'Zola')], links: { next: null } });
		httpTesting
			.expectOne('/lucca-api/employees?status=active&sort=familyName&limit=20&include=links,embedded')
			.flush({ items: [employee('1', 'Bob', 'Martin'), employee('2', 'Alice', 'Zola')], links: { next: null } });

		// Assert
		expect((await options).map(({ id }) => id)).toEqual(['2', '1']);
	}));

	it('should include the former employees once toggled', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource, directive } = setup();

		// Act
		directive.includeFormerEmployees.set(true);
		const options = firstValueFrom(dataSource().getOptions({ clue: 'bob', page: 0 }));
		httpTesting.expectOne('/lucca-api/employees?status=active,deactivated&sort=familyName&search=bob&limit=20&include=links,embedded').flush({ items: [], links: { next: null } });

		// Assert
		expect(await options).toEqual([]);
	}));

	it('should show the toggle of former employees when enabled', fakeAsync(() => {
		// Arrange
		const { panelHeaderTpl } = setup([], FormerEmployeesHostComponent);

		// Assert
		expect(panelHeaderTpl()).toBe(LuCoreSelectFormerEmployeesComponent);
	}));

	it('should read the portrait link and tell homonyms apart with their department', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource } = setup();

		// Act
		const options = firstValueFrom(dataSource().getOptions({ clue: 'bob', page: 0 }));
		httpTesting.expectOne('/lucca-api/employees?status=active&sort=familyName&search=bob&limit=20&include=links,embedded').flush({
			items: [
				{ ...employee('1', 'Bob', 'Martin', '10'), portrait: { id: 'p1' }, links: { files: { p1: { href: '/files/p1?token=t' } } } },
				employee('2', 'Bob', 'Martin', '20'),
				employee('3', 'Bobby', 'Martin', '10'),
			],
			embedded: {
				'job-position': { '10': { id: '10', department: { id: 'd1' } }, '20': { id: '20', department: { id: 'd2' } } },
				department: { d1: { id: 'd1', name: 'Sales' }, d2: { id: 'd2', name: 'Tech' } },
			},
			links: { next: null },
		});
		const transformed = await firstValueFrom(dataSource().transformOptions!(await options));

		// Assert
		expect(transformed.map(({ id, picture, additionalInformation }) => [id, picture?.href, additionalInformation])).toEqual([
			['1', '/files/p1?token=t', 'Sales'],
			['2', undefined, 'Tech'],
			['3', undefined, undefined],
		]);
	}));
});
