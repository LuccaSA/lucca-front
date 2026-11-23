import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuCoreSelectLegalUnitEstablishmentDirective } from './legal-unit-establishment.directive';
import { luLegalUnitEstablishmentRequired } from './legal-unit-establishment.validators';
import { LuLegalUnitEstablishmentOption, LuLegalUnitEstablishmentSelection, luEstablishmentOption, luLegalUnitOption } from './models';

const legalEntitiesUrl = '/lucca-api/legal-entities';
const establishmentsUrl = '/lucca-api/business-establishments';

const legalEntity = (id: string, legalName: string) => ({ id, legalName });
const establishment = (id: string, name: string, legalEntityId: string) => ({ id, name, legalEntity: { id: legalEntityId } });

/** The envelope every collection of the API answers in. */
const collection = <T>(items: T[], nextCursor: string | null = null, embedded: Record<string, unknown> = {}) => ({
	items,
	embedded,
	links: { prev: null, next: nextCursor ? { href: '...', cursor: nextCursor } : null },
});

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

	function flushLegalEntities(nextCursor: string | null = null): void {
		httpTestingController.expectOne((request) => request.url === legalEntitiesUrl).flush(collection([legalEntity('le-1', 'Lucca SAS'), legalEntity('le-2', 'Lucca Software GMBH')], nextCursor));
		tick();
		fixture.detectChanges();
	}

	function expandLegalUnit(id: string, name: string, expanded = true): void {
		host.multiSelect().optionExpandedChange$.next({ option: luLegalUnitOption({ id, name }), expanded });
	}

	function expandedIds(): string[] {
		return host
			.directive()
			.generateTrees([...host.multiSelect().dataSourceOptions()])
			.filter((tree) => tree.expanded)
			.map((tree) => tree.node.id);
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
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should list the legal units alone, establishments being loaded only on demand', fakeAsync(() => {
		openPanel();
		flushLegalEntities();

		expect(optionKeys()).toEqual(['legalUnit:le-1', 'legalUnit:le-2']);
		httpTestingController.expectNone((request) => request.url === establishmentsUrl);
	}));

	it('should pin the API version the collections require', fakeAsync(() => {
		openPanel();

		const request = httpTestingController.expectOne((candidate) => candidate.url === legalEntitiesUrl);
		expect(request.request.headers.get('Api-Version')).toBe('2024-11-01');
		request.flush(collection([]));
		tick();
	}));

	it('should key a legal unit and an establishment apart even when they share an id', fakeAsync(() => {
		openPanel();
		flushLegalEntities();

		const optionKey = host.multiSelect().optionKey();
		expect(optionKey(luLegalUnitOption({ id: 'x', name: 'Lucca SAS' }))).not.toBe(optionKey(luEstablishmentOption({ id: 'x', name: 'Lucca Brest', legalUnitId: 'le-1' })));
	}));

	it('should splice the establishments of an unfolded legal unit right after it', fakeAsync(() => {
		openPanel();
		flushLegalEntities();

		expandLegalUnit('le-1', 'Lucca SAS');
		const request = httpTestingController.expectOne((candidate) => candidate.url === establishmentsUrl);
		expect(request.request.params.get('legalEntity.id')).toBe('le-1');
		request.flush(collection([establishment('be-10', 'Lucca Brest', 'le-1'), establishment('be-11', 'Lucca Nantes', 'le-1')]));
		tick();
		fixture.detectChanges();

		expect(optionKeys()).toEqual(['legalUnit:le-1', 'establishment:be-10', 'establishment:be-11', 'legalUnit:le-2']);
	}));

	it('should walk the pages of a legal unit with the cursor the API hands back', fakeAsync(() => {
		openPanel();
		flushLegalEntities();

		expandLegalUnit('le-1', 'Lucca SAS');
		// A next link means another page, whatever the length of this one
		httpTestingController.expectOne((candidate) => candidate.url === establishmentsUrl && !candidate.params.has('page')).flush(collection([establishment('be-10', 'Lucca Brest', 'le-1')], 'cursor-2'));
		tick();

		httpTestingController
			.expectOne((candidate) => candidate.url === establishmentsUrl && candidate.params.get('page') === 'cursor-2')
			.flush(collection([establishment('be-11', 'Lucca Nantes', 'le-1')]));
		tick();
		fixture.detectChanges();

		expect(optionKeys()).toEqual(['legalUnit:le-1', 'establishment:be-10', 'establishment:be-11', 'legalUnit:le-2']);
	}));

	it('should fetch a legal unit once, however many times it is unfolded', fakeAsync(() => {
		openPanel();
		flushLegalEntities();

		expandLegalUnit('le-2', 'Lucca Software GMBH');
		httpTestingController.expectOne((candidate) => candidate.url === establishmentsUrl).flush(collection([establishment('be-20', 'Lucca Munich', 'le-2')]));
		tick();

		expandLegalUnit('le-2', 'Lucca Software GMBH');
		httpTestingController.expectNone((candidate) => candidate.url === establishmentsUrl);
	}));

	/** A search only queries the establishments: their collection is the sole one that takes a clue. */
	function search(clue: string, matched: ReturnType<typeof establishment>[], embedded: Record<string, unknown> = {}): void {
		host.multiSelect().clueChanged(clue);
		fixture.detectChanges();
		tick(300);
		fixture.detectChanges();
		httpTestingController
			.match((request) => request.url === establishmentsUrl)
			.filter((request) => !request.cancelled)
			.forEach((request) => request.flush(collection(matched, null, embedded)));
		httpTestingController
			.match((request) => request.url === legalEntitiesUrl)
			.filter((request) => !request.cancelled)
			.forEach((request) => request.flush(collection([legalEntity('le-1', 'Lucca SAS'), legalEntity('le-2', 'Lucca Software GMBH')])));
		tick();
		fixture.detectChanges();
	}

	it('should build the searched list from the establishments, their legal unit coming from embedded', fakeAsync(() => {
		openPanel();
		flushLegalEntities();

		search('brest', [establishment('be-10', 'Lucca Brest', 'le-1')], { 'legal-entity': { 'le-1': legalEntity('le-1', 'Lucca SAS') } });

		// The legal unit does not match the clue itself, yet it has to show up to hold the match
		expect(optionKeys()).toEqual(['legalUnit:le-1', 'establishment:be-10']);
		expect(expandedIds()).toEqual(['le-1']);
	}));

	it('should leave a legal unit folded by hand during a search folded', fakeAsync(() => {
		openPanel();
		flushLegalEntities();
		search('brest', [establishment('be-10', 'Lucca Brest', 'le-1')], { 'legal-entity': { 'le-1': legalEntity('le-1', 'Lucca SAS') } });

		expandLegalUnit('le-1', 'Lucca SAS', false);
		fixture.detectChanges();

		// The match no longer forces it open: only the next clue will
		expect(expandedIds()).toEqual([]);
	}));

	it('should give a legal unit back its unfolding state when the search is cleared', fakeAsync(() => {
		openPanel();
		flushLegalEntities();
		expandLegalUnit('le-2', 'Lucca Software GMBH');
		httpTestingController.expectOne((candidate) => candidate.url === establishmentsUrl).flush(collection([establishment('be-20', 'Lucca Munich', 'le-2')]));
		tick();

		search('brest', [establishment('be-10', 'Lucca Brest', 'le-1')], { 'legal-entity': { 'le-1': legalEntity('le-1', 'Lucca SAS') } });
		expandLegalUnit('le-1', 'Lucca SAS', false);
		fixture.detectChanges();

		search('', []);

		// What the search did to the unfolding goes with it
		expect(expandedIds()).toEqual(['le-2']);
	}));

	it('should keep a legal unit unfolded when the panel is closed and opened again', fakeAsync(() => {
		openPanel();
		flushLegalEntities();
		expandLegalUnit('le-1', 'Lucca SAS');
		httpTestingController.expectOne((candidate) => candidate.url === establishmentsUrl).flush(collection([establishment('be-10', 'Lucca Brest', 'le-1')]));
		tick();
		fixture.detectChanges();

		host.multiSelect().closePanel();
		fixture.detectChanges();
		openPanel();
		flushLegalEntities();

		// The state lives in the generator, which the panel does not own and does not take with it
		expect(expandedIds()).toEqual(['le-1']);
		expect(optionKeys()).toContain('establishment:be-10');
	}));

	it('should publish the two levels apart', fakeAsync(() => {
		const onChange = vi.fn();
		// The directive widens the form-control contract, so the declared array signature is bypassed
		(host.multiSelect().registerOnChange as unknown as (fn: (value: LuLegalUnitEstablishmentSelection) => void) => void)(onChange);
		openPanel();
		flushLegalEntities();

		host.multiSelect().updateValue([luLegalUnitOption({ id: 'le-1', name: 'Lucca SAS' }), luEstablishmentOption({ id: 'be-10', name: 'Lucca Brest', legalUnitId: 'le-1' })]);

		expect(onChange).toHaveBeenLastCalledWith({
			legalUnits: [{ kind: 'legalUnit', id: 'le-1', name: 'Lucca SAS' }],
			establishments: [{ kind: 'establishment', id: 'be-10', name: 'Lucca Brest', legalUnitId: 'le-1' }],
		});
	}));

	it('should take the published shape back on write', fakeAsync(() => {
		openPanel();
		flushLegalEntities();

		const selection: LuLegalUnitEstablishmentSelection = { legalUnits: [luLegalUnitOption({ id: 'le-2', name: 'Lucca Software GMBH' })], establishments: [] };
		(host.multiSelect().writeValue as unknown as (value: LuLegalUnitEstablishmentSelection) => void)(selection);

		expect(host.multiSelect().valueLength()).toBe(1);
	}));

	it('should reject an empty selection, which Validators.required would let through', () => {
		const control = (value: LuLegalUnitEstablishmentSelection | null) => ({ value }) as never;

		expect(luLegalUnitEstablishmentRequired(control(null))).toEqual({ required: true });
		expect(luLegalUnitEstablishmentRequired(control({ legalUnits: [], establishments: [] }))).toEqual({ required: true });
		expect(luLegalUnitEstablishmentRequired(control({ legalUnits: [luLegalUnitOption({ id: 'le-1', name: 'Lucca SAS' })], establishments: [] }))).toBeNull();
	});

	it('should nest establishments under their legal unit and ask the panel to fold them', fakeAsync(() => {
		openPanel();
		flushLegalEntities();

		const directive = host.directive();
		const trees = directive.generateTrees([
			luLegalUnitOption({ id: 'le-1', name: 'Lucca SAS' }),
			luEstablishmentOption({ id: 'be-10', name: 'Lucca Brest', legalUnitId: 'le-1' }),
			luEstablishmentOption({ id: 'be-20', name: 'Lucca Munich', legalUnitId: 'le-2' }),
		]);

		expect(directive.collapsable).toBe(true);
		expect(trees.map((tree) => tree.node.name)).toEqual(['Lucca SAS']);
		expect(trees[0].children?.map((child) => child.node.name)).toEqual(['Lucca Brest']);
	}));
});
