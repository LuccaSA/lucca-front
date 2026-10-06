import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, Directive, forwardRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SelectDataSource } from '@lucca-front/ng/core-select';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuCoreSelectEstablishmentsDirective } from './establishments.directive';
import { LuCoreSelectEstablishment } from './models';

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
	template: `<lu-multi-select luTestEstablishments [filters]="filters()" [operationIds]="operationIds()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuEstablishmentsDirectiveHostComponent {
	readonly filters = signal<Record<string, string | number | boolean> | null>(null);
	readonly operationIds = signal<readonly number[] | null>(null);
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

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuEstablishmentsDirectiveHostComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
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
});
