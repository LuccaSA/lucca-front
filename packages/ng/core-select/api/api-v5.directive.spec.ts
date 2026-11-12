import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, SelectDataSource } from '@lucca-front/ng/core-select';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LuCoreSelectApiV5Directive, LuCoreSelectApiV5Item } from './api-v5.directive';
import { LU_SELECT_MAGIC_PAGE_SIZE, MAGIC_DEBOUNCE_DURATION } from './api.directive';
import { LuCoreSelectPublicApiDirective } from './public-api.directive';

const items = Array.from({ length: LU_SELECT_MAGIC_PAGE_SIZE + 5 }, (_, i) => ({ id: `${i}`, name: `item ${i}` }));

@Component({
	selector: 'lu-simple-select',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockSelectComponent {}

@Component({
	template: `<lu-simple-select apiV5="/my-app/api/items" sort="name" [filters]="{ isArchived: false }" />`,
	imports: [MockSelectComponent, LuCoreSelectApiV5Directive],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ApiV5HostComponent {}

@Component({
	template: `<lu-simple-select publicApi="/lucca-api/departments" apiVersion="2024-11-01" />`,
	imports: [MockSelectComponent, LuCoreSelectPublicApiDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PublicApiHostComponent {}

function setup<T>(host: new () => T) {
	let dataSource: SelectDataSource<LuCoreSelectApiV5Item> | undefined;
	const select = {
		isPanelOpen$: new BehaviorSubject(false),
		nextPage$: new Subject<void>(),
		clueChange$: new Subject<string>(),
		optionComparer: coreSelectDefaultOptionComparer,
		optionKey: coreSelectDefaultOptionKey,
		dataSource: { set: (ds: SelectDataSource<LuCoreSelectApiV5Item>) => (dataSource = ds) },
		loading: { set: () => {} },
	};

	TestBed.configureTestingModule({
		imports: [host],
		providers: [{ provide: ALuSelectInputComponent, useValue: select }, provideHttpClient(), provideHttpClientTesting()],
	});

	const fixture: ComponentFixture<T> = TestBed.createComponent(host);
	fixture.detectChanges();

	return {
		httpTesting: TestBed.inject(HttpTestingController),
		getOptions: (clue: string, page: number) => firstValueFrom(dataSource!.getOptions({ clue, page })),
		getTotalCount: () => firstValueFrom(dataSource!.getTotalCount!({ clue: '', page: 0 })),
	};
}

function expectGet(httpTesting: HttpTestingController, url: string): TestRequest {
	return httpTesting.expectOne((req) => req.urlWithParams === url);
}

describe(LuCoreSelectApiV5Directive.name, () => {
	it('should request the first page with the links include and the given sort and filters', fakeAsync(async () => {
		// Arrange
		const { httpTesting, getOptions } = setup(ApiV5HostComponent);

		// Act
		const options = getOptions('', 0);
		const req = expectGet(httpTesting, '/my-app/api/items?isArchived=false&sort=name&limit=20&include=links');
		req.flush({ items: items.slice(0, 3), links: { next: null } });

		// Assert
		expect(await options).toEqual(items.slice(0, 3));
		expect(req.request.headers.has('Api-Version')).toBe(false);
	}));

	it('should send the clue as the search param', fakeAsync(async () => {
		// Arrange
		const { httpTesting, getOptions } = setup(ApiV5HostComponent);

		// Act
		const options = getOptions('bob', 0);
		expectGet(httpTesting, '/my-app/api/items?isArchived=false&sort=name&search=bob&limit=20&include=links').flush({ items: [] });

		// Assert
		expect(await options).toEqual([]);
	}));

	it('should follow the cursor of the previous page', fakeAsync(async () => {
		// Arrange
		const { httpTesting, getOptions } = setup(ApiV5HostComponent);
		const firstPage = getOptions('', 0);
		expectGet(httpTesting, '/my-app/api/items?isArchived=false&sort=name&limit=20&include=links').flush({
			items: items.slice(0, LU_SELECT_MAGIC_PAGE_SIZE),
			links: { next: { href: '/my-app/api/items?page=!abc', cursor: '!abc' } },
		});
		await firstPage;

		// Act
		const secondPage = getOptions('', 1);
		expectGet(httpTesting, '/my-app/api/items?isArchived=false&sort=name&limit=20&include=links&page=!abc').flush({
			items: items.slice(LU_SELECT_MAGIC_PAGE_SIZE),
			links: { next: null },
		});

		// Assert
		expect(await secondPage).toEqual(items.slice(LU_SELECT_MAGIC_PAGE_SIZE));
		httpTesting.verify();
	}));

	it('should stop paging once there is no next link', fakeAsync(async () => {
		// Arrange
		const { httpTesting, getOptions } = setup(ApiV5HostComponent);
		const firstPage = getOptions('', 0);
		expectGet(httpTesting, '/my-app/api/items?isArchived=false&sort=name&limit=20&include=links').flush({
			items: items.slice(0, LU_SELECT_MAGIC_PAGE_SIZE),
			links: { next: null },
		});
		await firstPage;

		// Act
		const secondPage = await getOptions('', 1);

		// Assert
		expect(secondPage).toEqual([]);
		httpTesting.verify();
	}));

	it('should count the options with the totalCount include', fakeAsync(async () => {
		// Arrange
		const { httpTesting, getTotalCount } = setup(ApiV5HostComponent);

		// Act
		const totalCount = getTotalCount();
		tick(MAGIC_DEBOUNCE_DURATION);
		expectGet(httpTesting, '/my-app/api/items?isArchived=false&sort=name&limit=0&include=totalCount').flush({ items: [], totalCount: 42 });

		// Assert
		expect(await totalCount).toBe(42);
	}));
});

describe(LuCoreSelectPublicApiDirective.name, () => {
	it('should send the Api-Version header on every request', fakeAsync(async () => {
		// Arrange
		const { httpTesting, getOptions, getTotalCount } = setup(PublicApiHostComponent);

		// Act
		const options = getOptions('', 0);
		const optionsReq = expectGet(httpTesting, '/lucca-api/departments?limit=20&include=links');
		optionsReq.flush({ items: [] });
		const totalCount = getTotalCount();
		tick(MAGIC_DEBOUNCE_DURATION);
		const countReq = expectGet(httpTesting, '/lucca-api/departments?limit=0&include=totalCount');
		countReq.flush({ items: [], totalCount: 0 });
		await options;
		await totalCount;

		// Assert
		expect(optionsReq.request.headers.get('Api-Version')).toBe('2024-11-01');
		expect(countReq.request.headers.get('Api-Version')).toBe('2024-11-01');
	}));
});
