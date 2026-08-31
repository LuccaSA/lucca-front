import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LuDisabledOptionDirective, LuOptionDirective, LuOptionGroupDirective, SelectDataSource } from '@lucca-front/ng/core-select';
import { Observable, delay, of } from 'rxjs';
import { LuMultiSelectInputComponent } from '../input/select-input.component';
import { LuMultiSelectPanelComponent } from './panel.component';

type Legume = { id: number; name: string };

// A single group ("red") keeps exactly one group-action button in the DOM, so the tests
// never have to disambiguate between groups. `getGroupOptions` deliberately returns MORE
// options than `getOptions` renders (it adds `pepper`) to prove the post-load toggle acts on
// the authoritative group set fetched on click, not just the options currently visible.
const tomato: Legume = { id: 1, name: 'Tomato' };
const radish: Legume = { id: 2, name: 'Radish' };
const pepper: Legume = { id: 3, name: 'Pepper' };

const VISIBLE_OPTIONS: Legume[] = [tomato, radish];
const FULL_GROUP_OPTIONS: Legume[] = [tomato, radish, pepper];

/**
 * Regression coverage for the group "select all / unselect all" toggle that loads its options
 * lazily through `SelectDataSource.getGroupOptions` (`panel.component.ts` -> `toggleOptions` ->
 * `#applyGroupToggle`).
 *
 * On release/22.0 the post-load branch called `#applyGroupToggle(allGroupOptions, allGroupOptions)`,
 * which (1) never took the "unselect all" branch, (2) could therefore only ever select, and
 * (3) re-appended already-selected options. See PR #5149 review + issue #5289.
 */
describe('LuMultiSelectPanelComponent (group toggle via getGroupOptions)', () => {
	@Component({
		template: `
			<lu-multi-select #ref [dataSource]="dataSource" [(ngModel)]="value">
				<ng-container *luOptionGroup="let group; by: groupBy; select: ref">{{ group.key }}</ng-container>
			</lu-multi-select>
		`,
		imports: [LuMultiSelectInputComponent, LuOptionGroupDirective, FormsModule],
		changeDetection: ChangeDetectionStrategy.OnPush,
	})
	class HostComponent {
		readonly groupBy = (_legume: Legume): string => 'red';
		value: Legume[] = [];
		groupLoadDelayMs = 0;

		readonly dataSource: SelectDataSource<Legume, string> = {
			getOptions: () => of(VISIBLE_OPTIONS),
			getGroupOptions: (): Observable<Legume[]> => of(FULL_GROUP_OPTIONS).pipe(delay(this.groupLoadDelayMs)),
		};
	}

	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;
	let overlayContainerElement: HTMLElement;

	function openPanel(): void {
		fixture.detectChanges();
		const select = fixture.debugElement.query(By.directive(LuMultiSelectInputComponent)).componentInstance as LuMultiSelectInputComponent<Legume>;
		select.openPanel();
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();
	}

	function groupActionButton(): HTMLButtonElement {
		return overlayContainerElement.querySelector<HTMLButtonElement>('button[group-action]')!;
	}

	function clickGroupAction(): void {
		groupActionButton().click();
		fixture.detectChanges();
		tick(host.groupLoadDelayMs);
		fixture.detectChanges();
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HostComponent],
		});

		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
	});

	it('renders a single group-action button once the group options are visible', fakeAsync(() => {
		openPanel();

		expect(overlayContainerElement.querySelectorAll('button[group-action]').length).toBe(1);
	}));

	it('selects the full group returned by getGroupOptions, including options not yet rendered', fakeAsync(() => {
		host.value = [];
		openPanel();

		clickGroupAction();

		// `pepper` is only reachable through getGroupOptions, proving the load path is used.
		expect(host.value).toEqual([tomato, radish, pepper]);
	}));

	it('unselects the whole group on a second toggle (the branch that was dead on release/22.0)', fakeAsync(() => {
		host.value = [tomato, radish, pepper];
		openPanel();

		clickGroupAction();

		expect(host.value).toEqual([]);
	}));

	it('completes a partial selection without duplicating already-selected options', fakeAsync(() => {
		host.value = [tomato];
		openPanel();

		clickGroupAction();

		// tomato appears exactly once — the release/22.0 double-append bug would yield [tomato, tomato, radish, pepper].
		expect(host.value).toEqual([tomato, radish, pepper]);
		expect(host.value.filter((o) => o === tomato).length).toBe(1);
	}));

	it('marks the group as loading while getGroupOptions is in flight, then clears it', fakeAsync(() => {
		host.value = [];
		host.groupLoadDelayMs = 100;
		openPanel();

		const select = fixture.debugElement.query(By.directive(LuMultiSelectInputComponent)).componentInstance as LuMultiSelectInputComponent<Legume>;
		const panel = (select.panelRef as unknown as { instance: LuMultiSelectPanelComponent<Legume> }).instance;

		groupActionButton().click();

		// While the fetch is in flight the group key is registered and nothing is selected yet.
		expect(panel.groupLoadingKeys().has('red')).toBe(true);
		expect(host.value).toEqual([]);

		tick(100);
		fixture.detectChanges();

		// Once resolved the key is cleared and the full group is selected.
		expect(panel.groupLoadingKeys().has('red')).toBe(false);
		expect(host.value).toEqual([tomato, radish, pepper]);
	}));
});

// `#applyGroupToggle` filters out disabled options (looked up in the rendered options registry)
// from both the "select all" and "unselect all" branches. `radish` is rendered and disabled;
// `pepper` is only reachable through getGroupOptions so it is never subject to the disabled filter.
describe('LuMultiSelectPanelComponent (group toggle skips disabled options)', () => {
	@Component({
		template: `
			<lu-multi-select #ref [dataSource]="dataSource" [(ngModel)]="value">
				<ng-container *luOptionGroup="let group; by: groupBy; select: ref">{{ group.key }}</ng-container>
				<ng-template luOption [luOptionSelect]="ref" let-legume>
					<span [luDisabledOption]="legume.id === 2">{{ legume.name }}</span>
				</ng-template>
			</lu-multi-select>
		`,
		imports: [LuMultiSelectInputComponent, LuOptionGroupDirective, LuOptionDirective, LuDisabledOptionDirective, FormsModule],
		changeDetection: ChangeDetectionStrategy.OnPush,
	})
	class HostComponent {
		readonly groupBy = (_legume: Legume): string => 'red';
		value: Legume[] = [];

		readonly dataSource: SelectDataSource<Legume, string> = {
			getOptions: () => of(VISIBLE_OPTIONS),
			getGroupOptions: (): Observable<Legume[]> => of(FULL_GROUP_OPTIONS),
		};
	}

	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;
	let overlayContainerElement: HTMLElement;

	function openPanel(): void {
		fixture.detectChanges();
		const select = fixture.debugElement.query(By.directive(LuMultiSelectInputComponent)).componentInstance as LuMultiSelectInputComponent<Legume>;
		select.openPanel();
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();
	}

	function clickGroupAction(): void {
		overlayContainerElement.querySelector<HTMLButtonElement>('button[group-action]')!.click();
		fixture.detectChanges();
		tick();
		fixture.detectChanges();
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HostComponent],
		});

		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
	});

	it('selects every enabled group option but leaves the disabled one out', fakeAsync(() => {
		host.value = [];
		openPanel();

		clickGroupAction();

		// radish (id 2) is disabled and rendered, so it is skipped; pepper is selected via the load path.
		expect(host.value).toEqual([tomato, pepper]);
	}));

	it('never unselects a disabled option when clearing the group', fakeAsync(() => {
		host.value = [tomato, radish, pepper];
		openPanel();

		clickGroupAction();

		// Only the enabled members are removed; the disabled radish stays selected.
		expect(host.value).toEqual([radish]);
	}));
});
