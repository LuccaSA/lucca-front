import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';
import { FilterBarComponent } from './filter-bar.component';

@Component({
	template: `<lu-filter-bar>
		<lu-filter-pill label="Période" optional name="period" />
		<lu-filter-pill label="Établissement" optional name="establishment" />
		<lu-filter-pill label="Date" name="date" />
	</lu-filter-bar>`,
	imports: [FilterBarComponent, FilterPillComponent],
})
class HostComponent {}

@Component({
	template: `<lu-filter-bar>
		<lu-filter-pill label="Période" optional grouping="Dates" />
		<lu-filter-pill label="Établissement" optional />
		<lu-filter-pill label="Date d'entrée" optional grouping="Dates" />
		<lu-filter-pill label="Département" optional grouping="Organisation" />
	</lu-filter-bar>`,
	imports: [FilterBarComponent, FilterPillComponent],
})
class GroupedHostComponent {}

describe('FilterBarComponent: the optional pills selector', () => {
	let fixture: ComponentFixture<HostComponent>;
	let bar: FilterBarComponent;
	let select: LuMultiSelectInputComponent<FilterPillComponent>;

	function labels(): string[] {
		return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.filterPill-label'), (label) => label.textContent.trim());
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		bar = fixture.debugElement.query(By.directive(FilterBarComponent)).componentInstance;
		const barPill = fixture.debugElement
			.queryAll(By.directive(FilterPillComponent))
			.map((debugElement) => debugElement.componentInstance as FilterPillComponent)
			.find((pill) => pill.label() === bar.intl().additionalFilters);
		select = barPill.inputComponentRef() as LuMultiSelectInputComponent<FilterPillComponent>;
	});

	it('opens the panel behind a backdrop catching the outside click', fakeAsync(() => {
		const overlayContainer = TestBed.inject(OverlayContainer).getContainerElement();
		(fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button.filterPill.mod-button').click();
		fixture.detectChanges();
		tick(50);
		fixture.detectChanges();

		const backdrop = overlayContainer.querySelector<HTMLElement>('.cdk-overlay-backdrop.cdk-overlay-transparent-backdrop');
		expect(backdrop).not.toBeNull();

		backdrop.click();
		fixture.detectChanges();
		tick(500);
		fixture.detectChanges();

		expect(overlayContainer.querySelector('.cdk-overlay-backdrop')).toBeNull();
		overlayContainer.remove();
	}));

	it('renders an icon-only pill whose multi-select lists the optional pills', () => {
		const trigger = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button.filterPill.mod-button');
		expect(trigger.querySelector('.filterPill-icon .lucca-icon').className).toContain('icon-filtersDescending');
		// The label is only carried by the icon's screen reader text, nothing else is displayed
		expect(trigger.querySelector('.pr-u-mask').textContent).toBe(bar.intl().additionalFilters);
		expect(trigger.querySelector('.filterPill-label, .filterPill-value')).toBeNull();
		expect(labels()).toEqual(['Date']);
		expect(select.options()?.map((pill) => pill.label())).toEqual(['Période', 'Établissement']);
		expect(select.value).toEqual([]);
	});

	it('displays the pills selected in the multi-select', () => {
		select.updateValue([bar.optionalPills()[1]]);
		fixture.detectChanges();

		expect(bar.optionalPills().map((pill) => pill.displayed())).toEqual([false, true]);
		expect(labels()).toEqual(['Établissement', 'Date']);
	});

	it('hides a pill unselected in the multi-select', () => {
		select.updateValue(bar.optionalPills());
		fixture.detectChanges();
		select.updateValue([bar.optionalPills()[0]]);
		fixture.detectChanges();

		expect(bar.optionalPills().map((pill) => pill.displayed())).toEqual([true, false]);
		expect(labels()).toEqual(['Période', 'Date']);
	});
});

describe('FilterBarComponent: grouping the optional pills', () => {
	let fixture: ComponentFixture<GroupedHostComponent>;
	let select: LuMultiSelectInputComponent<FilterPillComponent>;

	function openPanel(): HTMLElement {
		const overlayContainer = TestBed.inject(OverlayContainer).getContainerElement();
		(fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button.filterPill.mod-button').click();
		fixture.detectChanges();
		tick(50);
		fixture.detectChanges();
		return overlayContainer;
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [GroupedHostComponent] });
		fixture = TestBed.createComponent(GroupedHostComponent);
		fixture.detectChanges();
		const bar = fixture.debugElement.query(By.directive(FilterBarComponent)).componentInstance as FilterBarComponent;
		const barPill = fixture.debugElement
			.queryAll(By.directive(FilterPillComponent))
			.map((debugElement) => debugElement.componentInstance as FilterPillComponent)
			.find((pill) => pill.label() === bar.intl().additionalFilters);
		select = barPill.inputComponentRef() as LuMultiSelectInputComponent<FilterPillComponent>;
	});

	it('lists the pills of a same group together, ungrouped ones first', () => {
		expect(select.options().map((pill) => pill.label())).toEqual(['Établissement', 'Période', "Date d'entrée", 'Département']);
	});

	it('renders one panel group per grouping value', fakeAsync(() => {
		const overlayContainer = openPanel();

		// The group title is rendered in the span next to the checkbox one
		const groups = Array.from(overlayContainer.querySelectorAll('lu-listbox-option[group]'), (group) => group.querySelector('.listboxOption-content > span:not([aria-hidden])').textContent.trim());
		expect(groups).toEqual(['', 'Dates', 'Organisation']);
		overlayContainer.remove();
	}));

	it('leaves the options ungrouped when no pill declares a group', fakeAsync(() => {
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({ imports: [HostComponent] });
		const ungroupedFixture = TestBed.createComponent(HostComponent);
		ungroupedFixture.detectChanges();
		const overlayContainer = TestBed.inject(OverlayContainer).getContainerElement();
		(ungroupedFixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button.filterPill.mod-button').click();
		ungroupedFixture.detectChanges();
		tick(50);
		ungroupedFixture.detectChanges();

		expect(overlayContainer.querySelector('lu-listbox-option[group]')).toBeNull();
		expect(overlayContainer.querySelectorAll('lu-select-option').length).toBe(2);
		overlayContainer.remove();
	}));
});
