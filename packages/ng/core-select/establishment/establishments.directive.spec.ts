import { HttpRequest, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, Directive, forwardRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SelectDataSource, ɵLU_UNGROUPED_OPTIONS } from '@lucca-front/ng/core-select';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuCoreSelectEstablishmentsDirective } from './establishments.directive';
import { LuCoreSelectEstablishment } from './models';
import { provideCoreSelectCurrentEstablishmentId } from './my-establishment.provider';

const establishmentsUrl = '/organization/structure/api/establishments';
const legalUnitsUrl = '/organization/structure/api/legal-units';

const establishment = (id: number, legalUnitId: number): LuCoreSelectEstablishment => ({
	id,
	name: `Establishment ${id}`,
	code: `E${id}`,
	legalUnitId,
	legalUnit: { id: legalUnitId, name: `Legal unit ${legalUnitId}`, countryId: 1 },
});

@Directive({
	selector: '[luTestEstablishments]',
	providers: [
		{
			provide: LuCoreSelectEstablishmentsDirective,
			useExisting: forwardRef(() => TestEstablishmentsDirective),
		},
	],
})
class TestEstablishmentsDirective extends LuCoreSelectEstablishmentsDirective {
	public setPageSize(size: number): void {
		this.pageSize = size;
	}
}

@Component({
	selector: 'lu-establishments-directive-host',
	imports: [LuMultiSelectInputComponent, TestEstablishmentsDirective],
	template: `<lu-multi-select luTestEstablishments [filters]="filters()" [operationIds]="operationIds()" [displayMyEstablishmentOption]="displayMyEstablishmentOption()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuEstablishmentsDirectiveHostComponent {
	readonly filters = signal<Record<string, string | number | boolean> | null>(null);
	readonly operationIds = signal<readonly number[] | null>(null);
	readonly displayMyEstablishmentOption = signal(false);
	readonly multiSelect = viewChild.required<LuMultiSelectInputComponent<LuCoreSelectEstablishment>>(LuMultiSelectInputComponent);
	readonly establishmentsDirective = viewChild.required<TestEstablishmentsDirective>(TestEstablishmentsDirective);
}

describe(LuCoreSelectEstablishmentsDirective.name, () => {
	let httpTestingController: HttpTestingController;
	let fixture: ComponentFixture<LuEstablishmentsDirectiveHostComponent>;
	let host: LuEstablishmentsDirectiveHostComponent;

	/** The grouping service gates every options call behind those two count calls. */
	function flushGroupingCounts(): void {
		httpTestingController.match((req) => req.url === legalUnitsUrl).forEach((req) => req.flush({ count: 2 }));
		httpTestingController.match((req) => req.url === establishmentsUrl && req.params.get('fields.root') === 'count').forEach((req) => req.flush({ count: 42 }));
	}

	function getGroupOptions(legalUnitId: number): LuCoreSelectEstablishment[] {
		const dataSource = host.multiSelect().dataSource() as SelectDataSource<LuCoreSelectEstablishment, unknown>;
		const options: LuCoreSelectEstablishment[] = [];
		dataSource.getGroupOptions!(legalUnitId).subscribe((groupOptions) => options.push(...groupOptions));
		return options;
	}

	function expectGroupPage(legalUnitId: number, page: number) {
		return httpTestingController.expectOne((req) => req.url === establishmentsUrl && req.params.get('legalUnitId') === `${legalUnitId}` && req.params.get('page') === `${page}`);
	}

	function loadOptions(clue: string, page: number): { options: readonly LuCoreSelectEstablishment[] } {
		const result = { options: [] as readonly LuCoreSelectEstablishment[] };
		const dataSource = host.multiSelect().dataSource() as SelectDataSource<LuCoreSelectEstablishment, unknown>;
		dataSource.getOptions({ clue, page }).subscribe((options) => (result.options = options));
		return result;
	}

	function expectOptionsPage(page: number) {
		return httpTestingController.expectOne((req) => req.url === establishmentsUrl && req.params.get('page') === `${page}`);
	}

	/** The lookup is the only establishments call filtered by `id` without paging. */
	function isMyEstablishmentLookup(req: HttpRequest<unknown>): boolean {
		return req.url === establishmentsUrl && req.params.has('id') && !req.params.has('page');
	}

	function expectMyEstablishmentLookup() {
		return httpTestingController.expectOne(isMyEstablishmentLookup);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuEstablishmentsDirectiveHostComponent],
			providers: [provideHttpClient(), provideHttpClientTesting(), provideCoreSelectCurrentEstablishmentId(() => 3)],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		fixture = TestBed.createComponent(LuEstablishmentsDirectiveHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		host.establishmentsDirective().setPageSize(2);
		flushGroupingCounts();
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should expose getGroupOptions on its data source', () => {
		expect(host.multiSelect().dataSource().getGroupOptions).toBeDefined();
	});

	it('should load every page of the legal unit, including the options not rendered yet', fakeAsync(() => {
		const options = getGroupOptions(1);

		expectGroupPage(1, 1).flush([establishment(1, 1), establishment(2, 1)]);
		tick();
		// The first page is full, so a second one is requested
		expectGroupPage(1, 2).flush([establishment(3, 1)]);
		tick();

		expect(options.map((option) => option.id)).toEqual([1, 2, 3]);
	}));

	it('should restrict the legal unit call with the same filters as the list', fakeAsync(() => {
		host.filters.set({ appInstanceId: 5 });
		host.operationIds.set([12, 13]);
		fixture.detectChanges();

		getGroupOptions(7);

		const req = expectGroupPage(7, 1);
		expect(req.request.params.get('appInstanceId')).toBe('5');
		expect(req.request.params.get('operations')).toBe('12,13');
		expect(req.request.params.get('search')).toBeNull();
		req.flush([establishment(1, 7)]);
		tick();
	}));

	it('should keep only the requested legal unit when the url ignores `legalUnitId`', fakeAsync(() => {
		const options = getGroupOptions(1);

		// A full page mixing groups: paging must go on even though a single option matches
		expectGroupPage(1, 1).flush([establishment(1, 1), establishment(2, 2)]);
		tick();
		expectGroupPage(1, 2).flush([establishment(3, 1)]);
		tick();

		expect(options.map((option) => option.id)).toEqual([1, 3]);
	}));

	it('should not look up my establishment unless `displayMyEstablishmentOption` is set', fakeAsync(() => {
		const result = loadOptions('', 0);

		expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
		tick();

		expect(result.options.map((option) => option.id)).toEqual([1, 3]);
	}));

	describe('displayMyEstablishmentOption', () => {
		beforeEach(() => {
			host.displayMyEstablishmentOption.set(true);
			fixture.detectChanges();
		});

		it('should display my establishment as the first option, out of its legal unit group', fakeAsync(() => {
			const result = loadOptions('', 0);

			const lookup = expectMyEstablishmentLookup();
			expect(lookup.request.params.get('id')).toBe('3');
			lookup.flush([establishment(3, 2)]);
			expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([3, 1]);
			const grouping = host.multiSelect().groupingSignal()!;
			expect(grouping.selector(establishment(3, 2))).toBe(ɵLU_UNGROUPED_OPTIONS);
			expect(grouping.selector(establishment(1, 1))).toBe(1);
		}));

		it('should remove my establishment from the next pages without looking it up again', fakeAsync(() => {
			loadOptions('', 0);
			expectMyEstablishmentLookup().flush([establishment(3, 2)]);
			expectOptionsPage(1).flush([establishment(1, 1), establishment(2, 1)]);
			tick();

			const nextPage = loadOptions('', 1);
			expectOptionsPage(2).flush([establishment(3, 2), establishment(4, 2)]);
			tick();

			expect(nextPage.options.map((option) => option.id)).toEqual([4]);
		}));

		it('should restrict the lookup with the same filters as the options', fakeAsync(() => {
			host.filters.set({ appInstanceId: 5 });
			host.operationIds.set([12, 13]);
			fixture.detectChanges();

			loadOptions('', 0);

			const lookup = expectMyEstablishmentLookup();
			expect(lookup.request.params.get('appInstanceId')).toBe('5');
			expect(lookup.request.params.get('operations')).toBe('12,13');
			lookup.flush([]);
			expectOptionsPage(1).flush([]);
			tick();
		}));

		it('should look my establishment up again when the restrictions change', fakeAsync(() => {
			loadOptions('', 0);
			expectMyEstablishmentLookup().flush([establishment(3, 2)]);
			expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
			tick();

			host.filters.set({ legalUnitId: 1 });
			fixture.detectChanges();
			const result = loadOptions('', 0);

			const lookup = expectMyEstablishmentLookup();
			expect(lookup.request.params.get('legalUnitId')).toBe('1');
			lookup.flush([]);
			expectOptionsPage(1).flush([establishment(1, 1)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([1]);
			expect(host.establishmentsDirective().isMyEstablishmentOption(establishment(3, 2))).toBe(false);
		}));

		it('should not look my establishment up when an `id` filter excludes it', fakeAsync(() => {
			host.filters.set({ id: '1,2' });
			fixture.detectChanges();

			const result = loadOptions('', 0);

			httpTestingController.expectNone(isMyEstablishmentLookup);
			expectOptionsPage(1).flush([establishment(1, 1), establishment(2, 1)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([1, 2]);
		}));

		it('should look my establishment up when an `id` filter includes it', fakeAsync(() => {
			host.filters.set({ id: '2,3' });
			fixture.detectChanges();

			const result = loadOptions('', 0);

			const lookup = expectMyEstablishmentLookup();
			expect(lookup.request.params.get('id')).toBe('3');
			lookup.flush([establishment(3, 2)]);
			expectOptionsPage(1).flush([establishment(2, 1), establishment(3, 2)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([3, 2]);
		}));

		it('should leave the options untouched when my establishment is out of the restrictions', fakeAsync(() => {
			const result = loadOptions('', 0);

			expectMyEstablishmentLookup().flush([]);
			expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([1, 3]);
			expect(host.establishmentsDirective().isMyEstablishmentOption(establishment(3, 2))).toBe(false);
		}));

		it('should ignore an establishment returned by a url that ignores `id`', fakeAsync(() => {
			const result = loadOptions('', 0);

			expectMyEstablishmentLookup().flush([establishment(1, 1)]);
			expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([1, 3]);
		}));

		it('should still display the options when the lookup fails', fakeAsync(() => {
			const result = loadOptions('', 0);

			expectMyEstablishmentLookup().flush('Error', { status: 500, statusText: 'Internal Server Error' });
			expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([1, 3]);
		}));

		it('should look my establishment up again after a failed lookup', fakeAsync(() => {
			loadOptions('', 0);
			expectMyEstablishmentLookup().flush('Error', { status: 500, statusText: 'Internal Server Error' });
			expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
			tick();

			const result = loadOptions('', 0);
			expectMyEstablishmentLookup().flush([establishment(3, 2)]);
			expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([3, 1]);
		}));

		it('should not display my establishment while searching', fakeAsync(() => {
			const result = loadOptions('Establishment', 0);

			expectOptionsPage(1).flush([establishment(1, 1), establishment(3, 2)]);
			tick();

			expect(result.options.map((option) => option.id)).toEqual([1, 3]);
			expect(host.establishmentsDirective().isMyEstablishmentOption(establishment(3, 2))).toBe(false);
		}));
	});
});

describe(`${LuCoreSelectEstablishmentsDirective.name} without current establishment`, () => {
	it('should not display "My establishment" when the app does not provide it', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [LuEstablishmentsDirectiveHostComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});
		const httpTestingController = TestBed.inject(HttpTestingController);
		const fixture = TestBed.createComponent(LuEstablishmentsDirectiveHostComponent);
		fixture.componentInstance.displayMyEstablishmentOption.set(true);
		fixture.detectChanges();
		httpTestingController.match((req) => req.url === legalUnitsUrl).forEach((req) => req.flush({ count: 2 }));
		httpTestingController.match((req) => req.url === establishmentsUrl && req.params.get('fields.root') === 'count').forEach((req) => req.flush({ count: 42 }));

		const dataSource = fixture.componentInstance.multiSelect().dataSource() as SelectDataSource<LuCoreSelectEstablishment, unknown>;
		let options: readonly LuCoreSelectEstablishment[] = [];
		dataSource.getOptions({ clue: '', page: 0 }).subscribe((page) => (options = page));
		TestBed.tick();

		httpTestingController.expectOne((req) => req.url === establishmentsUrl && req.params.get('page') === '1').flush([establishment(1, 1), establishment(3, 2)]);
		tick();

		expect(options.map((option) => option.id)).toEqual([1, 3]);
		httpTestingController.verify();
	}));
});
