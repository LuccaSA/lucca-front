import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, LuOptionGrouping, SelectDataSource } from '@lucca-front/ng/core-select';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LuCoreSelectPublicEstablishment, LuCoreSelectPublicEstablishmentsDirective } from './public-establishments.directive';

@Component({
	selector: 'lu-simple-select',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockSelectComponent {}

@Component({
	template: `<lu-simple-select publicEstablishments />`,
	imports: [MockSelectComponent, LuCoreSelectPublicEstablishmentsDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

const embedded = {
	'legal-entity': {
		'1': { id: '1', legalName: 'Lucca UK' },
		'2': { id: '2', legalName: 'Lucca FR' },
	},
};

function setup() {
	let dataSource: SelectDataSource<LuCoreSelectPublicEstablishment, unknown> | undefined;
	let grouping: LuOptionGrouping<LuCoreSelectPublicEstablishment, unknown> | undefined;
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
					groupingSignal: { set: (g: typeof grouping) => (grouping = g) },
					dataSource: { set: (ds: SelectDataSource<LuCoreSelectPublicEstablishment, unknown>) => (dataSource = ds) },
					loading: { set: () => {} },
				},
			},
			provideHttpClient(),
			provideHttpClientTesting(),
		],
	});
	TestBed.createComponent(HostComponent).detectChanges();

	return {
		httpTesting: TestBed.inject(HttpTestingController),
		dataSource: () => dataSource!,
		grouping: () => grouping,
	};
}

const countUrl = (url: string) => `${url}?isArchived=false&limit=0&include=totalCount`;

describe(LuCoreSelectPublicEstablishmentsDirective.name, () => {
	it('should search the non archived establishments sorted by legal entity, with their embedded legal entity', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource } = setup();

		// Act
		const options = firstValueFrom(dataSource().getOptions({ clue: 'bob', page: 0 }));
		const req = httpTesting.expectOne('/lucca-api/business-establishments?isArchived=false&sort=legalEntity.name&search=bob&limit=20&include=links,embedded');
		req.flush({
			items: [
				{ id: '10', name: 'Bobigny', legalEntity: { id: '2' } },
				{ id: '11', name: 'Bobby', legalEntity: { id: '3' } },
			],
			embedded,
			links: { next: null },
		});

		// Assert
		expect(await options).toEqual([
			{ id: '10', name: 'Bobigny', legalEntity: { id: '2', legalName: 'Lucca FR' } },
			{ id: '11', name: 'Bobby', legalEntity: { id: '3' } },
		]);
		expect(req.request.headers.get('Api-Version')).toBe('2024-11-01');
	}));

	it('should group by legal entity when there are several legal entities and establishments', fakeAsync(() => {
		// Arrange
		const { httpTesting, grouping } = setup();

		// Act
		httpTesting.expectOne(countUrl('/lucca-api/legal-entities')).flush({ items: [], totalCount: 2 });
		httpTesting.expectOne(countUrl('/lucca-api/business-establishments')).flush({ items: [], totalCount: 3 });

		// Assert
		expect(grouping()?.selector({ id: '12', name: 'Lyon', legalEntity: { id: '2' } })).toBe('2');
	}));

	it('should not group with a single legal entity', fakeAsync(() => {
		// Arrange
		const { httpTesting, grouping } = setup();

		// Act
		httpTesting.expectOne(countUrl('/lucca-api/legal-entities')).flush({ items: [], totalCount: 1 });
		httpTesting.expectOne(countUrl('/lucca-api/business-establishments')).flush({ items: [], totalCount: 3 });

		// Assert
		expect(grouping()).toBeUndefined();
	}));

	it('should load every establishment of a legal entity to select it as a whole', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource } = setup();

		// Act
		const groupOptions = firstValueFrom(dataSource().getGroupOptions!('1'));
		httpTesting.expectOne('/lucca-api/business-establishments?isArchived=false&sort=legalEntity.name&legalEntity.id=1&limit=100&include=links,embedded').flush({
			items: [{ id: '11', name: 'London', legalEntity: { id: '1' } }],
			embedded,
			links: { next: { href: '', cursor: '!next' } },
		});
		httpTesting.expectOne('/lucca-api/business-establishments?isArchived=false&sort=legalEntity.name&legalEntity.id=1&limit=100&include=links,embedded&page=!next').flush({
			items: [{ id: '12', name: 'Manchester', legalEntity: { id: '1' } }],
			embedded,
			links: { next: null },
		});

		// Assert
		expect((await groupOptions).map(({ id, legalEntity }) => [id, legalEntity.legalName])).toEqual([
			['11', 'Lucca UK'],
			['12', 'Lucca UK'],
		]);
	}));
});
