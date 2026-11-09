import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuCoreSelectLegalUnitEstablishmentDirective } from './legal-unit-establishment.directive';
import { luLegalUnitEstablishmentRequired } from './legal-unit-establishment.validators';
import { LuLegalUnitEstablishmentOption, LuLegalUnitEstablishmentSelection, luEstablishmentOption, luLegalUnitOption } from './models';

const legalUnitsUrl = '/organization/structure/api/legal-units';
const establishmentsUrl = '/organization/structure/api/establishments';

@Component({
	selector: 'lu-legal-unit-establishment-host',
	imports: [LuMultiSelectInputComponent, LuCoreSelectLegalUnitEstablishmentDirective],
	template: `<lu-multi-select legalUnitEstablishment />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuLegalUnitEstablishmentHostComponent {
	readonly multiSelect = viewChild.required<LuMultiSelectInputComponent<LuLegalUnitEstablishmentOption>>(LuMultiSelectInputComponent);
	readonly directive = viewChild.required(LuCoreSelectLegalUnitEstablishmentDirective);
}

describe(LuCoreSelectLegalUnitEstablishmentDirective.name, () => {
	let httpTestingController: HttpTestingController;
	let fixture: ComponentFixture<LuLegalUnitEstablishmentHostComponent>;
	let host: LuLegalUnitEstablishmentHostComponent;

	function openPanel(): void {
		host.multiSelect().openPanel();
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();
	}

	function flushLegalUnits(): void {
		httpTestingController
			.expectOne((request) => request.url === legalUnitsUrl)
			.flush([
				{ id: 1, name: 'Lucca SAS' },
				{ id: 2, name: 'Lucca Software GMBH' },
			]);
		tick();
		fixture.detectChanges();
	}

	function expandLegalUnit(legalUnit: { id: number; name: string }, expanded = true): void {
		host.multiSelect().optionExpandedChange$.next({ option: luLegalUnitOption(legalUnit), expanded });
	}

	function expandedIds(): number[] {
		return host
			.directive()
			.generateTrees([...host.multiSelect().dataSourceOptions()])
			.filter((tree) => tree.expanded)
			.map((tree) => tree.node.id);
	}

	function search(clue: string, matched: { id: number; name: string; legalUnitId: number; legalUnit?: { id: number; name: string } }[]): void {
		host.multiSelect().clueChanged(clue);
		fixture.detectChanges();
		tick(300);
		fixture.detectChanges();
		// Clearing a clue can leave more than one reload pending, so every one of them is answered
		httpTestingController
			.match((request) => request.url === legalUnitsUrl)
			.filter((request) => !request.cancelled)
			.forEach((request) =>
				request.flush([
					{ id: 1, name: 'Lucca SAS' },
					{ id: 2, name: 'Lucca Software GMBH' },
				]),
			);
		httpTestingController
			.match((request) => request.url === establishmentsUrl)
			.filter((request) => !request.cancelled)
			.forEach((request) => request.flush(matched));
		tick();
		fixture.detectChanges();
	}

	function optionKeys(): unknown[] {
		const select = host.multiSelect();
		return select.dataSourceOptions().map((option) => select.optionKey()(option));
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuLegalUnitEstablishmentHostComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});

		fixture = TestBed.createComponent(LuLegalUnitEstablishmentHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	beforeEach(() => {
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should list the legal units alone, establishments being loaded only on demand', fakeAsync(() => {
		openPanel();
		flushLegalUnits();

		expect(optionKeys()).toEqual(['legalUnit:1', 'legalUnit:2']);
		httpTestingController.expectNone((request) => request.url === establishmentsUrl);
	}));

	it('should key a legal unit and an establishment apart even when they share an id', fakeAsync(() => {
		openPanel();
		flushLegalUnits();

		const optionKey = host.multiSelect().optionKey();
		expect(optionKey(luLegalUnitOption({ id: 1, name: 'Lucca SAS' }))).not.toBe(optionKey(luEstablishmentOption({ id: 1, name: 'Lucca Brest', legalUnitId: 1 })));
	}));

	it('should splice the establishments of an unfolded legal unit right after it', fakeAsync(() => {
		openPanel();
		flushLegalUnits();

		expandLegalUnit({ id: 1, name: 'Lucca SAS' });
		const request = httpTestingController.expectOne((candidate) => candidate.url === establishmentsUrl && candidate.params.get('legalUnitId') === '1');
		expect(request.request.params.get('sort')).toBe('name');
		request.flush([
			{ id: 10, name: 'Lucca Brest', legalUnitId: 1 },
			{ id: 11, name: 'Lucca Nantes', legalUnitId: 1 },
		]);
		tick();
		fixture.detectChanges();

		expect(optionKeys()).toEqual(['legalUnit:1', 'establishment:10', 'establishment:11', 'legalUnit:2']);
	}));

	it('should fetch a legal unit once, however many times it is unfolded', fakeAsync(() => {
		openPanel();
		flushLegalUnits();

		expandLegalUnit({ id: 2, name: 'Lucca Software GMBH' });
		httpTestingController.expectOne((candidate) => candidate.url === establishmentsUrl).flush([{ id: 20, name: 'Lucca Munich', legalUnitId: 2 }]);
		tick();

		expandLegalUnit({ id: 2, name: 'Lucca Software GMBH' });
		httpTestingController.expectNone((candidate) => candidate.url === establishmentsUrl);
	}));

	it('should publish the two levels apart', fakeAsync(() => {
		const onChange = vi.fn();
		// The directive widens the form-control contract, so the declared array signature is bypassed
		(host.multiSelect().registerOnChange as unknown as (fn: (value: LuLegalUnitEstablishmentSelection) => void) => void)(onChange);
		openPanel();
		flushLegalUnits();

		host.multiSelect().updateValue([luLegalUnitOption({ id: 1, name: 'Lucca SAS' }), luEstablishmentOption({ id: 10, name: 'Lucca Brest', legalUnitId: 1 })]);

		expect(onChange).toHaveBeenLastCalledWith({
			legalUnits: [{ kind: 'legalUnit', id: 1, name: 'Lucca SAS' }],
			establishments: [{ kind: 'establishment', id: 10, name: 'Lucca Brest', legalUnitId: 1 }],
		});
	}));

	it('should take the published shape back on write', fakeAsync(() => {
		openPanel();
		flushLegalUnits();

		const selection: LuLegalUnitEstablishmentSelection = { legalUnits: [luLegalUnitOption({ id: 2, name: 'Lucca Software GMBH' })], establishments: [] };
		(host.multiSelect().writeValue as unknown as (value: LuLegalUnitEstablishmentSelection) => void)(selection);

		expect(host.multiSelect().valueLength()).toBe(1);
	}));

	it('should reject an empty selection, which Validators.required would let through', () => {
		const control = (value: LuLegalUnitEstablishmentSelection | null) => ({ value }) as never;

		expect(luLegalUnitEstablishmentRequired(control(null))).toEqual({ required: true });
		expect(luLegalUnitEstablishmentRequired(control({ legalUnits: [], establishments: [] }))).toEqual({ required: true });
		expect(luLegalUnitEstablishmentRequired(control({ legalUnits: [luLegalUnitOption({ id: 1, name: 'Lucca SAS' })], establishments: [] }))).toBeNull();
	});

	it('should bring back the legal unit of an establishment the search matched, unfolded', fakeAsync(() => {
		openPanel();
		flushLegalUnits();

		host.multiSelect().clueChanged('brest');
		fixture.detectChanges();
		tick(300);
		fixture.detectChanges();

		// Both collections are queried: a clue can match a name on either level
		httpTestingController.expectOne((request) => request.url === legalUnitsUrl && request.params.get('search') === 'brest').flush([]);
		httpTestingController
			.expectOne((request) => request.url === establishmentsUrl && request.params.get('search') === 'brest')
			.flush([{ id: 10, name: 'Lucca Brest', legalUnitId: 1, legalUnit: { id: 1, name: 'Lucca SAS' } }]);
		tick();
		fixture.detectChanges();

		// The legal unit does not match the clue itself, yet it has to show up to hold the match
		expect(optionKeys()).toEqual(['legalUnit:1', 'establishment:10']);

		const trees = host.directive().generateTrees([...host.multiSelect().dataSourceOptions()]);
		expect(trees[0].expanded).toBe(true);
		expect(trees[0].children?.map((child) => child.node.name)).toEqual(['Lucca Brest']);
	}));

	it('should nest establishments under their legal unit and ask the panel to fold them', fakeAsync(() => {
		openPanel();
		flushLegalUnits();

		const directive = host.directive();
		const trees = directive.generateTrees([
			luLegalUnitOption({ id: 1, name: 'Lucca SAS' }),
			luEstablishmentOption({ id: 10, name: 'Lucca Brest', legalUnitId: 1 }),
			luEstablishmentOption({ id: 20, name: 'Lucca Munich', legalUnitId: 2 }),
		]);

		expect(directive.collapsible).toBe(true);
		expect(trees.map((tree) => tree.node.name)).toEqual(['Lucca SAS']);
		expect(trees[0].children?.map((child) => child.node.name)).toEqual(['Lucca Brest']);
	}));

	it('should keep a legal unit unfolded when the panel is closed and opened again', fakeAsync(() => {
		openPanel();
		flushLegalUnits();
		expandLegalUnit({ id: 1, name: 'Lucca SAS' });
		httpTestingController.expectOne((request) => request.url === establishmentsUrl).flush([{ id: 10, name: 'Lucca Brest', legalUnitId: 1 }]);
		tick();
		fixture.detectChanges();

		host.multiSelect().closePanel();
		fixture.detectChanges();
		openPanel();
		flushLegalUnits();

		// The state lives in the generator, which the panel does not own and does not take with it
		expect(expandedIds()).toEqual([1]);
		expect(optionKeys()).toContain('establishment:10');
	}));

	it('should leave a legal unit folded by hand during a search folded', fakeAsync(() => {
		openPanel();
		flushLegalUnits();
		search('brest', [{ id: 10, name: 'Lucca Brest', legalUnitId: 1, legalUnit: { id: 1, name: 'Lucca SAS' } }]);
		expect(expandedIds()).toEqual([1]);

		expandLegalUnit({ id: 1, name: 'Lucca SAS' }, false);
		fixture.detectChanges();

		// The match no longer forces it open: only the next clue will
		expect(expandedIds()).toEqual([]);
	}));

	it('should give a legal unit back its unfolding state when the search is cleared', fakeAsync(() => {
		openPanel();
		flushLegalUnits();
		expandLegalUnit({ id: 2, name: 'Lucca Software GMBH' });
		httpTestingController.expectOne((request) => request.url === establishmentsUrl).flush([{ id: 20, name: 'Lucca Munich', legalUnitId: 2 }]);
		tick();

		search('brest', [{ id: 10, name: 'Lucca Brest', legalUnitId: 1, legalUnit: { id: 1, name: 'Lucca SAS' } }]);
		expandLegalUnit({ id: 1, name: 'Lucca SAS' }, false);
		fixture.detectChanges();

		search('', []);

		// What the search did to the unfolding goes with it
		expect(expandedIds()).toEqual([2]);
	}));
});
