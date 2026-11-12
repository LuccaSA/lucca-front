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

describe(LuCoreSelectPublicEstablishmentsDirective.name, () => {
	it('should search the non archived establishments with their embedded legal entity', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource } = setup();

		// Act
		const options = firstValueFrom(dataSource().getOptions({ clue: 'bob', page: 0 }));
		const req = httpTesting.expectOne((r) => r.urlWithParams === '/lucca-api/business-establishments?isArchived=false&search=bob&limit=20&include=links,embedded');
		req.flush({ items: [{ id: '10', name: 'Bobigny', legalEntity: { id: '2' } }], embedded, links: { next: null } });

		// Assert
		expect(await options).toEqual([{ id: '10', name: 'Bobigny', legalEntity: { id: '2', legalName: 'Lucca FR' } }]);
		expect(req.request.headers.get('Api-Version')).toBe('2024-11-01');
	}));

	it('should load every establishment sorted by legal entity and group them without a clue', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource, grouping } = setup();

		// Act
		const options = firstValueFrom(dataSource().getOptions({ clue: '', page: 0 }));
		httpTesting.expectOne('/lucca-api/business-establishments?isArchived=false&limit=100&include=links,embedded').flush({
			items: [
				{ id: '10', name: 'Paris', legalEntity: { id: '2' } },
				{ id: '11', name: 'London', legalEntity: { id: '1' } },
			],
			embedded,
			links: { next: { href: '', cursor: '!next' } },
		});
		httpTesting.expectOne('/lucca-api/business-establishments?isArchived=false&limit=100&include=links,embedded&page=!next').flush({
			items: [
				{ id: '12', name: 'Lyon', legalEntity: { id: '2' } },
				{ id: '13', name: 'Hidden', legalEntity: { id: '3' } },
			],
			embedded: {},
			links: { next: null },
		});

		// Assert
		expect((await options).map(({ id, legalEntity }) => [id, legalEntity.legalName])).toEqual([
			['13', undefined],
			['12', 'Lucca FR'],
			['10', 'Lucca FR'],
			['11', 'Lucca UK'],
		]);
		expect(grouping()?.selector({ id: '12', name: 'Lyon', legalEntity: { id: '2' } })).toBe('2');
	}));

	it('should select a whole legal entity from the loaded establishments', fakeAsync(async () => {
		// Arrange
		const { httpTesting, dataSource } = setup();
		const options = firstValueFrom(dataSource().getOptions({ clue: '', page: 0 }));
		httpTesting.expectOne('/lucca-api/business-establishments?isArchived=false&limit=100&include=links,embedded').flush({
			items: [
				{ id: '10', name: 'Paris', legalEntity: { id: '2' } },
				{ id: '11', name: 'London', legalEntity: { id: '1' } },
			],
			embedded,
			links: { next: null },
		});
		await options;

		// Act
		const groupOptions = await firstValueFrom(dataSource().getGroupOptions!('1'));

		// Assert
		expect(groupOptions.map(({ id }) => id)).toEqual(['11']);
		httpTesting.verify();
	}));
});
